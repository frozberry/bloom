import { GradedExam, User } from "@prisma/client"
import { prisma } from "../prisma/client"
import dayjs from "dayjs"
import _ from "lodash"

export const getGradedTests = async () => {
  const gradedTests = await prisma.gradedExam.findMany()
  return gradedTests
}

export const findGradedTestById = async (id: string) => {
  const gradedTest = await prisma.gradedExam.findUnique({
    where: {
      id,
    },
    include: {
      gradedProblems: true,
      user: true,
    },
  })
  return gradedTest
}

export const getUsersGradedTests = async (userId: string) => {
  const gradedTests = await prisma.gradedExam.findMany({
    where: {
      userId,
    },
    include: {
      gradedProblems: true,
    },
  })
  return gradedTests
}

// TODO copying old API - maybe can be refactored
// Sorting could be done on frontend, but this doesn't include gradedProblems
export const getSortedGradedTests = async (userId: string) => {
  const gradedTests = await prisma.gradedExam.findMany({
    where: { userId: userId },
  })
  const tests = await prisma.exam.findMany()

  // TODO improve types
  const testSorted: { testId: string; num: number; attempts: any }[] = []

  tests.forEach((t) => {
    const usersAttempts = gradedTests.filter((gt) => gt.examId === t.id)
    const testEntry = {
      testId: t.id,
      num: t.num,
      attempts: usersAttempts,
    }
    if (usersAttempts.length > 0) {
      testSorted.push(testEntry)
    }
  })

  return testSorted
}

// Use correct type for answers
export const submitTest = async (user: User, testId: string, answers: any) => {
  // Fetch the Test the user just completed
  console.log("Fetching test")
  const test = await prisma.exam.findUnique({
    where: { id: testId },
    include: {
      problems: {
        include: {
          categories: true,
        },
      },
    },
  })

  // TODO prevent TS null errors later. Maybe a better way to do this?
  if (!test) {
    return null
  }

  // Reconcile the Test's problems with the user's submissions
  console.log("Reconcilling users selections with test problems")
  const gradedProblems = test.problems.map((p) => {
    // TODO use correct type
    const submitted = answers.find((a: any) => p.id === a.problemId)
    const gp = {
      question: p.question,
      correct: p.correct.toString(),
      multi: p.multi,
      num: p.num,
      img: p.img,
      options: p.options,
      unit: p.unit,
      categories: {
        connect: p.categories,
      },
      selected: submitted.selected?.toString() || null,
    }

    return gp
  })

  console.log("Fetching user's gradedTests")
  console.log("Checking if first attempt")
  const usersGradedTests = await prisma.gradedExam.findMany({
    where: {
      userId: user.id,
    },
  })

  const firstAttempt = await isFirstAttemptAtTest(usersGradedTests, testId)

  // grade the users GradedCategories
  if (firstAttempt) {
    console.log("It is first attempt, marking gradedCategories")
    gradedProblems.forEach(async (gp) => {
      gp.categories.connect.forEach(async (c) => {
        await prisma.gradedCategory.update({
          where: {
            userId_categoryName: {
              userId: user.id,
              categoryName: c.name,
            },
          },
          data: {
            attempts: {
              increment: 1,
            },
            correct: {
              increment: isProblemCorrect(gp) ? 1 : 0,
            },
          },
        })
      })
    })
    console.log("Grading categories done")
  }

  const marks = gradedProblems.filter((p) => isProblemCorrect(p)).length

  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  console.log("Deleting test session")
  const testSession = await prisma.examSession.delete({
    where: { userId: user.id },
  })

  const time = calculateTime(testSession.start)

  console.log("Saving gradedTest")
  const savedGradedTest = await prisma.gradedExam.create({
    data: {
      examId: test.id,
      userId: user.id,
      marks,
      total: test.problems.length,
      num: test.num,
      percent,
      firstAttempt,
      time,
      gradedProblems: {
        create: gradedProblems,
      },
    },
    include: {
      gradedProblems: true,
    },
  })

  const withNewTest = usersGradedTests.concat(savedGradedTest)
  const onlyFirstAttempt = withNewTest.filter((gt) => gt.firstAttempt)

  console.log("Updating user")
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      score: _.meanBy(onlyFirstAttempt, (gt) => gt.percent),
    },
  })

  return savedGradedTest
}

const isFirstAttemptAtTest = async (
  usersGradedTests: GradedExam[],
  testId: string
) => {
  let firstAttempt = true
  if (usersGradedTests.filter((gt) => gt.examId === testId).length > 0) {
    firstAttempt = false
  }
  return firstAttempt
}

// TODO use correct type
const isProblemCorrect = (problem: any) => {
  if (problem.multi) {
    return problem.selected === problem.correct
  }
  return Number(problem.selected) === Number(problem.correct)
}

const calculateTime = (startDate: Date) => {
  const start = dayjs(startDate)
  const now = dayjs()
  const seconds = Math.round(now.second() - start.second())
  return seconds
}
