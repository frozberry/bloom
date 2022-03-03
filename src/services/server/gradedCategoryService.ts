import { Category } from "@prisma/client"
import { CategoryWithAverage } from "../../lib/types"
import { prisma } from "../../prisma/client"

export const getGradedCategories = async () => {
  const gradedCatergories = await prisma.gradedCategory.findMany()
  return gradedCatergories
}

export const getUsersGradedCategories = async (userId: string) => {
  const gradedCatergories = await prisma.gradedCategory.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  })
  return gradedCatergories
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

  const categories = Object.values(Category)

  const categoriesAveraged: CategoryWithAverage[] = categories.map((c) => {
    const mgc = gradedCategories.filter((gc) => gc.category === c)

    const totalAttempts = mgc.reduce((acc, gc) => gc.attempts + acc, 0)
    const totalCorrect = mgc.reduce((acc, gc) => gc.correct + acc, 0)
    return {
      average: (100 * totalCorrect) / totalAttempts,
      category: c,
    }
  })

  return categoriesAveraged
}
