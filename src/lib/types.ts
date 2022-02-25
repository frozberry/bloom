import { Category, GradedCategory, Prisma } from "@prisma/client"

export type UserProfile = Prisma.UserGetPayload<{
  select: {
    firstName: true
    lastName: true
    dob: true
    gender: true
    profilePicture: true
    score: true
  }
}>

export type ProblemWithCategory = Prisma.ProblemGetPayload<{
  include: { categories: true }
}>

// Generic type for Tests and GradedTests
export type Numbered = {
  num: number
}

export type CategoryWithAverage = Category & {
  average: number
}
