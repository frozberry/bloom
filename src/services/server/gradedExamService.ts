import { ExamSession, Prisma, Problem } from "@prisma/client"
import { calculateDuration } from "../../lib/calculateDuration"
import { ExamResultOverivew, ProblemSubmission } from "../../lib/types"
import { prisma } from "../../prisma/client"
import { findExamById } from "./examService"
import { findExamSessionById } from "./examSessionService"
import { updateGradedCategories } from "./gradedCategoryService"
import { updateUserScore } from "./userService"

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
      exam: true,
    },
  })
  return gradedExam
}

export const getUsersGradedExams = async (userId: string, exam: boolean) => {
  const gradedExams = await prisma.gradedExam.findMany({
    where: {
      userId,
    },
    include: {
      gradedProblems: true,
      exam,
    },
  })
  return gradedExams
}

/* ---------------------------- Results Overview ---------------------------- */
export const getExamResultsOverview = async (userId: string) => {
  const gradedExams = await prisma.gradedExam.findMany({
    where: { userId: userId },
    include: { exam: true },
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
  const time = calculateDuration(examSession.start)
  const firstAttempt = await isFirstAttemptAtExam(examSession)

  const gradedProblems = exam.problems.map((problem) => {
    const submission = submissions.find((submission) => {
      return submission.problemId === problem.id
    })
    const gradedProblem = {
      //TODO string conversion might not be needed
      question: problem.question,
      multi: problem.multi,
      correct: problem.correct,
      selected: submission?.selected.toString(),
      options: problem.options,
      unit: problem.unit,

      problem: {
        connect: { id: problem.id },
      },
    }
    return gradedProblem
  })

  const newGradedExam = await prisma.gradedExam.create({
    data: {
      num: exam.num,
      marks,
      totalMarks,
      percent,
      firstAttempt,
      time,
      userId,
      examId: examSession.examId,
      gradedProblems: {
        create: gradedProblems,
      },
    },
    include: {
      gradedProblems: true,
    },
  })
  if (!newGradedExam) throw new Error("Graded Exam not created")

  if (firstAttempt) {
    updateGradedCategories(userId, newGradedExam.gradedProblems)
    updateUserScore(userId)
  }
  return newGradedExam
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
  const usersGradedExams = await getUsersGradedExams(examSession.userId, false)

  const pastAttempts = usersGradedExams.filter(
    (gradedExam) => gradedExam.examId === examSession.examId
  )
  if (pastAttempts.length > 0) {
    return false
  }
  return true
}
