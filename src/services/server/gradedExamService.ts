import { ExamSession, GradedExam, Problem } from "@prisma/client"
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

const updateGradedCategories = () => {
  console.log("It is first attempt, marking gradedCategories")
  gradedProblems.forEach(async (gradedProblem) => {
    gradedProblem.categories.forEach(async (category) => {
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
            increment: isProblemCorrect(gradedProblem) ? 1 : 0,
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

// TODO Use correct type for answers
export const submitExam = async (
  userId: string,
  examId: string,
  answers: any
) => {
  // Fetch the Exam the user just completed
  console.log("Fetching exam")
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      problems: true,
    },
  })

  if (!exam) return null

  // Reconcile the Exam's problems with the user's submissions
  console.log("Reconcilling users selections with exam problems")
  const gradedProblems = exam.problems.map((problem) => {
    // TODO use correct type
    const submitted = answers.find((a: any) => problem.id === a.problemId)
    const gradedProblem = {
      question: problem.question,
      correct: problem.correct.toString(),
      multi: problem.multi,
      num: problem.num,
      img: problem.img,
      options: problem.options,
      unit: problem.unit,
      categories: problem.categories,
      selected: submitted.selected?.toString() || null,
    }

    return gradedProblem
  })

  console.log("Fetching user's gradedExams")
  console.log("Checking if first attempt")
  const usersGradedExams = await prisma.gradedExam.findMany({
    where: {
      userId: userId,
    },
  })

  const firstAttempt = await isFirstAttemptAtExam(usersGradedExams, examId)

  // grade the users GradedCategories
  if (firstAttempt) {
    console.log("It is first attempt, marking gradedCategories")
    gradedProblems.forEach(async (gradedProblem) => {
      gradedProblem.categories.forEach(async (category) => {
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
              increment: isProblemCorrect(gradedProblem) ? 1 : 0,
            },
          },
        })
      })
    })
    console.log("Grading categories done")
  }

  const marks = gradedProblems.filter((problem) =>
    isProblemCorrect(problem)
  ).length

  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  console.log("Deleting exam session")
  const examSession = await prisma.examSession.delete({
    where: { userId: userId },
  })

  const time = calculateTime(examSession.start)

  console.log("Saving gradedExam")
  const savedGradedExam = await prisma.gradedExam.create({
    data: {
      examId: exam.id,
      userId: userId,
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
  const onlyFirstAttempts = withNewExam.filter(
    (gradedExam) => gradedExam.firstAttempt
  )

  console.log("Updating user")
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      score: _.meanBy(onlyFirstAttempts, (gradedExam) => gradedExam.percent),
    },
  })

  return savedGradedExam
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
