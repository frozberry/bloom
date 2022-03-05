import { ExamSession, GradedExam, GradedProblem, Problem } from "@prisma/client"
import { prisma } from "../../prisma/client"
import dayjs from "dayjs"
import _ from "lodash"
import { ExamResultOverivew, ProblemSubmission } from "../../lib/types"
import { findExamById } from "./examService"
import { findExamSessionById } from "./examSessionService"

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

export const getExamResultsOverview = async (userId: string) => {
  const gradedExams = await prisma.gradedExam.findMany({
    where: { userId: userId },
  })
  const exams = await prisma.exam.findMany()

  const examSorted: ExamResultOverivew[] = []

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

export const submitExamNew = async (
  userId: string,
  examSessionId: string,
  submissions: ProblemSubmission[]
) => {
  const examSession = await findExamSessionById(examSessionId)

  if (!examSession) {
    throw new Error("Exam session not found")
  }

  const exam = await findExamById(examSession.examId)
  if (!exam) {
    throw new Error("Exam not found")
  }

  const { marks, totalMarks, percent } = getMarks(submissions, exam.problems)
  const time = dayjs(examSession.start).millisecond() - dayjs().millisecond()
  const firstAttempt = await isFirstAttemptAtExam(examSession)

  const newGradedExam = await prisma.gradedExam.create({
    data: {
      marks,
      totalMarks,
      percent,
      firstAttempt,
      time,
      userId,
      examId: examSession.examId,
    },
  })

  if (firstAttempt) {
    updateGradedCategories()
    updateUserAverages(userId)
  }
}

const updateUserAverages = async (userId: string) => {
  console.log("Updating users average score")

  // TODO see if I can avoid this db call
  const gradedExams = await getUsersGradedExams(userId)

  const firstAttempts = gradedExams.filter(
    (gradedExam) => gradedExam.firstAttempt
  )

  const score = _.meanBy(firstAttempts, (gradedExam) => gradedExam.percent)

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      score,
    },
  })
}

const updateGradedCategories = async (
  userId: string,
  gradedProblems: GradedProblem[]
) => {
  gradedProblems.forEach(async (gradedProblem) => {
    gradedProblem.categories.forEach(async (category) => {
      const correct = isProblemCorrect(category)
      const mark = correct ? 1 : 0

      await prisma.gradedCategory.update({
        where: {
          userId_category: {
            userId: userId,
            category,
          },
        },
        data: {
          attempts: {
            increment: 1,
          },
          correct: {
            increment: mark,
          },
        },
      })
    })
  })
  console.log("Grading categories done")
}

const getMarks = (submissions: ProblemSubmission[], problems: Problem[]) => {
  const correct = correctSubmissions(submissions, problems)
  const marks = correct.length
  const totalMarks = problems.length
  const percent = (marks / totalMarks) * 100

  return { marks, totalMarks, percent }
}

const correctSubmissions = (
  submissions: ProblemSubmission[],
  problems: Problem[]
) => {
  const correct = submissions.filter((submission) => {
    const problem = problems.find(
      (problem) => problem.id === submission.problemId
    )
    return problem?.correct === submission.selected
  })

  return correct
}

const isFirstAttemptAtExam = async (examSession: ExamSession) => {
  const usersGradedExams = await getUsersGradedExams(examSession.userId)

  const pastAttempts = usersGradedExams.filter(
    (gradedExam) => gradedExam.examId === examSession.examId
  )
  if (pastAttempts.length > 0) {
    return false
  }
  return true
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
