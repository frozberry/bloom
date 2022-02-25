import { User } from "@prisma/client"
import { prisma } from "../prisma/client"

export const getGradedTests = async () => {
  const gradedTests = await prisma.gradedTest.findMany()
  return gradedTests
}

export const getUsersGradedTests = async (user: User) => {
  const gradedTests = await prisma.gradedTest.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
  })
  return gradedTests
}

// TODO blindly copied and pasted - not sure if working
// Compare with live api
export const getCatergoriesAverage = async () => {
  const gradedCategories = await prisma.gradedCategory.findMany({
    where: {
      attempts: {
        gt: 0,
      },
    },
  })

  const categories = await prisma.category.findMany()

  const categoriesAveraged = categories.map((c) => {
    const mgc = gradedCategories.filter((gc) => gc.categoryName === c.name)

    const totalAttempts = mgc.reduce((acc, gc) => gc.attempts + acc, 0)
    const totalCorrect = mgc.reduce((acc, gc) => gc.correct + acc, 0)
    return {
      average: (100 * totalCorrect) / totalAttempts,
      name: c.name,
    }
  })

  return categoriesAveraged
}
