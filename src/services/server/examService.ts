import { Category } from "@prisma/client"
import { prisma } from "../../prisma/client"
import _ from "lodash"
import { Numbered, ProblemJson } from "../../lib/types"
import { getUsersGradedExams } from "./gradedExamService"
import { constructProblems } from "./problemService"

export const getExams = async () => {
  const exams = await prisma.exam.findMany({
    include: {
      problems: true,
    },
  })
  return exams
}

export const getNextExam = async () => {
  const exams = await getExams()

  const nextExam = await prisma.exam.findUnique({
    where: {
      num: nextExamNum(exams),
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

export const createExamFromJson = async (problems: ProblemJson[]) => {
  const exams = await getExams()
  const numberedProblems = constructProblems(problems)

  const savedExam = await prisma.exam.create({
    data: {
      problems: {
        create: numberedProblems,
      },
      num: nextExamNum(exams),
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
