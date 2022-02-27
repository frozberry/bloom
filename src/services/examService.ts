import { Category, User } from "@prisma/client"
import { prisma } from "../prisma/client"
import _ from "lodash"
import { Numbered } from "../lib/types"
import { getGradedExams, getUsersGradedExams } from "./gradedExamService"

export const getExams = async () => {
  const exams = await prisma.exam.findMany({
    include: {
      problems: true,
    },
  })
  return exams
}

export const getNextExam = async (user: User) => {
  const gradedExams = await getUsersGradedExams(user.id)

  const nextExam = await prisma.exam.findUnique({
    where: {
      num: nextExamNum(gradedExams),
    },
    include: {
      problems: true,
    },
  })

  return nextExam
}

export const findExamById = async (id: string) => {
  const exam = await prisma.exam.findUnique({
    where: {
      id,
    },
    include: {
      problems: true,
    },
  })
  return exam
}

// TODO temporary any type for seed to work
// Previously ProblemWithCategory[]
export const createExam = async (problems: any[]) => {
  // TODO
  // allCatergoriesValid()

  // TODO maybe move to problemService
  const numberedProblems = problems.map((problem, i) => ({
    ...problem,
    num: i + 1,
    correct: problem.correct.toString(),
    // TODO use the real category
    categories: Category.NUMBERS,
  }))

  const exams = await getExams()

  const savedExam = await prisma.exam.create({
    data: {
      num: nextExamNum(exams),
      problems: {
        create: numberedProblems,
      },
    },
    include: {
      problems: true,
    },
  })

  return savedExam
}

export const deleteExam = async (id: string) => {
  const exam = await findExamById(id)
  if (!exam) {
    return false
  }

  await prisma.exam.delete({
    where: {
      id,
    },
  })
  return true
}

const nextExamNum = <T extends Numbered>(exams: T[]) => {
  const lastExam = _.maxBy(exams, (exam) => exam.num)

  const incrementedNum = lastExam ? lastExam.num + 1 : 1
  return incrementedNum
}
