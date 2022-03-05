import { ExamSession, GradedExam, GradedProblem, Problem } from "@prisma/client"
import { prisma } from "../../prisma/client"
import dayjs from "dayjs"
import _ from "lodash"
import { ExamResultOverivew, ProblemSubmission } from "../../lib/types"
import { findExamById } from "./examService"
import { findExamSessionById } from "./examSessionService"
import { updateUserScore } from "./userService"
import { updateGradedCategories } from "./gradedCategoryService"

/* ---------------------------------- CRUD ---------------------------------- */
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

/* ---------------------------- Results Overview ---------------------------- */
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

/* ------------------------------- Submit Exam ------------------------------ */
export const submitExam = async (
  userId: string,
  examSessionId: string,
  submissions: ProblemSubmission[]
) => {
  const examSession = await findExamSessionById(examSessionId)
  if (!examSession) throw new Error("Exam session not found")

  const exam = await findExamById(examSession.examId)
  if (!exam) throw new Error("Exam not found")

  const { marks, totalMarks, percent } = calculateMarks(
    submissions,
    exam.problems
  )
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
    include: {
      gradedProblems: true,
    },
  })

  if (firstAttempt) {
    updateGradedCategories(userId, newGradedExam.gradedProblems)
    updateUserScore(userId)
  }
}

/* --------------------------------- Helpers -------------------------------- */
const calculateMarks = (
  submissions: ProblemSubmission[],
  problems: Problem[]
) => {
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
