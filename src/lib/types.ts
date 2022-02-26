import { Category, Prisma } from "@prisma/client"

export type UserWithoutDate = Prisma.UserGetPayload<{
  select: {
    id: true
    email: true
    firstName: true
    lastName: true
    parentName: true
    gender: true
    admin: true
    profilePicture: true
    active: true
    score: true
    gradedExams: true
    gradedCategories: true
  }
}>

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
