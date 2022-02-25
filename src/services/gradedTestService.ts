import { GradedTest, Problem, User } from "@prisma/client"
import { prisma } from "../prisma/client"
import dayjs from "dayjs"
import _ from "lodash"

// Use correct type for answers
export const submitTest = async (user: User, testId: string, answers: any) => {
  // Fetch the Test the user just completed
  console.log("Fetching test")
  const test = await prisma.test.findUnique({
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
  const usersGradedTests = await prisma.gradedTest.findMany({
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
  const testSession = await prisma.testSession.delete({
    where: { userId: user.id },
  })

  const time = calculateTime(testSession.start)

  console.log("Saving gradedTest")
  const savedGradedTest = await prisma.gradedTest.create({
    data: {
      testId: test.id,
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
  usersGradedTests: GradedTest[],
  testId: string
) => {
  let firstAttempt = true
  if (usersGradedTests.filter((gt) => gt.testId === testId).length > 0) {
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
