import { Prisma } from "@prisma/client"

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
