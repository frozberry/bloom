import { prisma } from "../../prisma/client"

export const findExamSessionById = async (id: string) => {
  const examSession = await prisma.examSession.findUnique({
    where: {
      id,
    },
  })
  return examSession
}

export const findUsersExamSession = async (userId: string) => {
  const examSession = await prisma.examSession.findUnique({
    where: {
      userId,
    },
  })

  return examSession
}

export const createExamSession = async (userId: string, examId: string) => {
  const examSession = await prisma.examSession.create({
    data: {
      userId,
      examId,
    },
  })
  return examSession
}
