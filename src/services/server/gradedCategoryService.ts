import { Category, GradedProblem } from "@prisma/client"
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

export const createUsersGradedCategories = async (userId: string) => {
  const existing = await getUsersGradedCategories(userId)
  if (existing.length === 0) {
    const categories = Object.values(Category)
    const data = categories.map((category) => {
      return {
        userId,
        category,
      }
    })

    await prisma.gradedCategory.createMany({ data })
  }
}

// TODO blindly copied and pasted - not sure if working. Compare with live api
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

// TODO check what happens if it doesn't already exist
export const updateGradedCategories = async (
  userId: string,
  gradedProblems: GradedProblem[]
) => {
  gradedProblems.forEach(async (gradedProblem) => {
    gradedProblem.categories.forEach(async (category) => {
      const correct = gradedProblem.correct === gradedProblem.selected
      const mark = correct ? 1 : 0

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
            increment: mark,
          },
        },
      })
    })
  })
  console.log("Grading categories done")
}
