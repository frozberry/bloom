import { Category, Prisma } from "@prisma/client"

/* ----------------------------- UserWithoutDate ---------------------------- */
const userWithoutDate = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    parentName: true,
    gender: true,
    admin: true,
    profilePicture: true,
    active: true,
    score: true,
    gradedExams: true,
    gradedCategories: true,
  },
})

export type UserWithoutDate = Prisma.UserGetPayload<typeof userWithoutDate>

/* ------------------------------- UserProfile ------------------------------ */
const userProfile = Prisma.validator<Prisma.UserArgs>()({
  select: {
    firstName: true,
    lastName: true,
    dob: true,
    gender: true,
    profilePicture: true,
    score: true,
  },
})

export type UserProfile = Prisma.UserGetPayload<typeof userProfile>

/* --------------------------- ProblemWithCategory -------------------------- */
const problemWithCategory = Prisma.validator<Prisma.ProblemArgs>()({
  include: {
    categories: true,
  },
})

export type ProblemWithCategory = Prisma.ProblemGetPayload<
  typeof problemWithCategory
>

/* -------------------------------- Numbered -------------------------------- */
// Generic type for Exams and GradedExams
export type Numbered = {
  num: number
}

/* --------------------------- CategoryWithAverage -------------------------- */
export type CategoryWithAverage = Category & {
  average: number
}
