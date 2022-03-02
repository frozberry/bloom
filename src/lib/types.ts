import { Category, GradedExam, Prisma } from "@prisma/client"

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

/* -------------------------------- Numbered -------------------------------- */
// Generic type for Exams and GradedExams
export type Numbered = {
  num: number
}

/* --------------------------- CategoryWithAverage -------------------------- */
export type CategoryWithAverage = {
  category: Category
  average: number
}

/* --------------------------- ResetPasswordToken --------------------------- */
export type ResetPasswordToken = {
  id: string
  expires: number
}

/* ------------------------------- StoredUser ------------------------------- */

export type StoredUser = {
  id: string
  token: string
  email: string
}

/* -------------------------------- ServerError -------------------------------- */
export type ServerError = {
  type: string
  message: string
}

/* --------------------------- ExamResultOverview --------------------------- */
export type ExamResultOverivew = {
  examId: string
  num: number
  attempts: GradedExam[]
}
