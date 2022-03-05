import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import _ from "lodash"
import {
  ResetPasswordToken,
  UserProfile,
  UserWithoutDate,
} from "../../lib/types"
import { prisma } from "../../prisma/client"
import { getUsersGradedExams } from "./gradedExamService"

export const getUsers = async (): Promise<UserWithoutDate[]> => {
  const users = await prisma.user.findMany({
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
  return users
}

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

export const createUser = async (
  parentName: string,
  email: string,
  password: string
): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { parentName, email, passwordHash },
  })

  const token = jwt.sign(
    { id: user.id, email: user.email },
    // eslint-disable-next-line
    process.env.JWT_SECRET!
  )

  return token
}

export const editUser = async (
  userId: string,
  firstName: string,
  lastName: string,
  dob: string,
  gender: string
) => {
  const updatedData = {
    firstName,
    lastName,
    dob,
    gender,
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...updatedData,
    },
  })

  return updatedUser
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const user = await findUserById(id)
  if (!user) {
    return false
  }

  await prisma.user.delete({ where: { id } })
  return true
}

export const userIsOAuth = async (id: string): Promise<boolean> => {
  const user = await findUserById(id)
  if (user?.passwordHash) {
    return false
  }
  return true
}

export const updateUserScore = async (userId: string) => {
  console.log("Updating users score")
  const gradedExams = await getUsersGradedExams(userId, false)

  const firstAttempts = gradedExams.filter(
    (gradedExam) => gradedExam.firstAttempt
  )
  const score = _.meanBy(firstAttempts, (gradedExam) => gradedExam.percent)

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      score,
    },
  })
}
