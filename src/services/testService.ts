import { Category, Problem, Test, User } from "@prisma/client"
import { prisma } from "../prisma/client"
import _ from "lodash"

type Numbered = {
  num: number
}
type ProblemWithCategory = Problem & { categories: Category[] }

export const getTests = async () => {
  const tests = await prisma.test.findMany({
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
  const gradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
  })

  const nextTest = await prisma.test.findUnique({
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
  const test = await prisma.test.findUnique({
    where: {
      id,
    },
    include: {
      problems: true,
    },
  })
  return test
}

export const createTest = async (problems: ProblemWithCategory[]) => {
  // TODO
  // allCatergoriesValid()

  // TODO maybe move to problemService
  const numberedProblems = problems.map((problem, i) => ({
    ...problem,
    num: i + 1,
    correct: problem.correct.toString(),
    categories: problem.categories && {
      connect: problem.categories.map((c) => ({ name: c })),
    },
  }))

  const tests = await getTests()

  const savedTest = await prisma.test.create({
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
  await prisma.test.delete({
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
