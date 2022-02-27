import { Category, User } from "@prisma/client"
import { CategoryWithAverage } from "../lib/types"
import { prisma } from "../prisma/client"

export const getGradedCategories = async () => {
  const gradedCatergories = await prisma.gradedCategory.findMany()
  return gradedCatergories
}

export const getUsersGradedCategories = async (user: User) => {
  const gradedCatergories = await prisma.gradedCategory.findMany({
    where: {
      user: {
        id: user.id,
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

  // TODO find way to loop over
  // const categories = Object.values(Category)
  const categories: Category[] = [
    "ADDITION_SUBTRACTION",
    "ALGEBRA",
    "FRACTIONS",
    "GEOMETRY",
    "MEASUREMENT",
    "MULTIPLICATION_DIVISION",
    "NUMBERS",
    "RATIO_PROPORTION",
    "STATISTICS",
  ]

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
