import { User } from "@prisma/client"
import { prisma } from "../prisma/client"
import _ from "lodash"
import { Numbered } from "../lib/types"

export const getTests = async () => {
  const tests = await prisma.exam.findMany({
    include: {
      problems: {
        include: {
          categories: true,
        },
      },
    },
  })
  return tests
}

export const getNextTest = async (user: User) => {
  // TODO replace with service
  const gradedTests = await prisma.gradedExam.findMany({
    where: {
      userId: user.id,
    },
  })

  const nextTest = await prisma.exam.findUnique({
    where: {
      num: nextTestNum(gradedTests),
    },
    include: {
      problems: true,
    },
  })

  return nextTest
}

export const findTestById = async (id: string) => {
  const test = await prisma.exam.findUnique({
    where: {
      id,
    },
    include: {
      problems: true,
    },
  })
  return test
}

// TODO temporary any type for seed to work
// Previously ProblemWithCategory[]
export const createTest = async (problems: any[]) => {
  // TODO
  // allCatergoriesValid()

  // TODO maybe move to problemService
  const numberedProblems = problems.map((problem, i) => ({
    ...problem,
    num: i + 1,
    correct: problem.correct.toString(),
    categories: problem.categories && {
      // TODO this any can be removed when arg type is correct
      connect: problem.categories.map((category: any) => ({ name: category })),
    },
  }))

  const tests = await getTests()

  const savedTest = await prisma.exam.create({
    data: {
      num: nextTestNum(tests),
      problems: {
        create: numberedProblems,
      },
    },
    include: {
      problems: true,
    },
  })

  return savedTest
}

export const deleteTest = async (id: string) => {
  const test = await findTestById(id)
  if (!test) {
    return false
  }

  // TODO check if deleting test deletes problems too
  await prisma.exam.delete({
    where: {
      id,
    },
  })
  return true
}

const nextTestNum = <T extends Numbered>(tests: T[]) => {
  const lastTest = _.maxBy(tests, (test) => test.num)

  const incrementedNum = lastTest ? lastTest.num + 1 : 1
  return incrementedNum
}
