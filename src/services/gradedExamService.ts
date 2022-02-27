import { GradedExam, Prisma, User } from "@prisma/client"
import { prisma } from "../prisma/client"
import dayjs from "dayjs"
import _ from "lodash"

export const getGradedExams = async () => {
  const gradedExams = await prisma.gradedExam.findMany()
  return gradedExams
}

export const findGradedExamById = async (id: string) => {
  const gradedExam = await prisma.gradedExam.findUnique({
    where: {
      id,
    },
    include: {
      gradedProblems: true,
      user: true,
    },
  })
  return gradedExam
}

export const getUsersGradedExams = async (userId: string) => {
  const gradedExams = await prisma.gradedExam.findMany({
    where: {
      userId,
    },
    include: {
      gradedProblems: true,
    },
  })
  return gradedExams
}

// TODO copying old API - maybe can be refactored
// Sorting could be done on frontend, but this doesn't include gradedProblems
export const getSortedGradedExams = async (userId: string) => {
  const gradedExams = await prisma.gradedExam.findMany({
    where: { userId: userId },
  })
  const exams = await prisma.exam.findMany()

  // TODO improve types
  const examSorted: { examId: string; num: number; attempts: any }[] = []

  exams.forEach((t) => {
    const usersAttempts = gradedExams.filter((gt) => gt.examId === t.id)
    const examEntry = {
      examId: t.id,
      num: t.num,
      attempts: usersAttempts,
    }
    if (usersAttempts.length > 0) {
      examSorted.push(examEntry)
    }
  })

  return examSorted
}

// TODO Use correct type for answers
export const submitExam = async (user: User, examId: string, answers: any) => {
  // Fetch the Exam the user just completed
  console.log("Fetching exam")
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      problems: true,
    },
  })

  // TODO prevent TS null errors later. Maybe a better way to do this?
  if (!exam) {
    return null
  }

  // Reconcile the Exam's problems with the user's submissions
  console.log("Reconcilling users selections with exam problems")
  const gradedProblems = exam.problems.map((p) => {
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
      categories: p.categories,
      selected: submitted.selected?.toString() || null,
    }

    return gp
  })

  console.log("Fetching user's gradedExams")
  console.log("Checking if first attempt")
  const usersGradedExams = await prisma.gradedExam.findMany({
    where: {
      userId: user.id,
    },
  })

  const firstAttempt = await isFirstAttemptAtExam(usersGradedExams, examId)

  // grade the users GradedCategories
  if (firstAttempt) {
    console.log("It is first attempt, marking gradedCategories")
    gradedProblems.forEach(async (gp) => {
      gp.categories.forEach(async (category) => {
        await prisma.gradedCategory.update({
          where: {
            userId_category: {
              userId: user.id,
              category,
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

  console.log("Deleting exam session")
  const examSession = await prisma.examSession.delete({
    where: { userId: user.id },
  })

  const time = calculateTime(examSession.start)

  console.log("Saving gradedExam")
  const savedGradedExam = await prisma.gradedExam.create({
    data: {
      examId: exam.id,
      userId: user.id,
      marks,
      total: exam.problems.length,
      num: exam.num,
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

  const withNewExam = usersGradedExams.concat(savedGradedExam)
  const onlyFirstAttempt = withNewExam.filter((gt) => gt.firstAttempt)

  console.log("Updating user")
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      score: _.meanBy(onlyFirstAttempt, (gt) => gt.percent),
    },
  })

  return savedGradedExam
}

const isFirstAttemptAtExam = async (
  usersGradedExams: GradedExam[],
  examId: string
) => {
  let firstAttempt = true
  if (usersGradedExams.filter((gt) => gt.examId === examId).length > 0) {
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
