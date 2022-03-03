import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  ResetPasswordToken,
  UserProfile,
  UserWithoutDate,
} from "../../lib/types"
import { prisma } from "../../prisma/client"

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

/* ------------------------------- Profile ------------------------------- */

export const getProfiles = async (): Promise<UserProfile[]> => {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      profilePicture: true,
      score: true,
    },
  })

  return users
}

export const findProfileById = async (
  id: string
): Promise<UserProfile | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      profilePicture: true,
      score: true,
    },
  })

  return user
}

/* ---------------------------------- Login --------------------------------- */
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await findUserByEmail(email)
  if (!user) {
    return null
  }

  const passwordCorrect = await validatePassword(
    password,
    user.passwordHash as string
  )
  if (!passwordCorrect) {
    return null
  }

  // const token = jwt.sign(
  //   { id: user.id, email: user.email },
  //   // eslint-disable-next-line
  //   process.env.JWT_SECRET!
  // )

  return user
}

/* -------------------------------- Password -------------------------------- */
export const validatePassword = async (
  password: string,
  passwordHash: string
) => {
  const correct = await bcrypt.compare(password, passwordHash)
  return correct
}

export const changePassword = async (userId: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const updatedUser = prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  })
  return updatedUser
}

export const resetPassword = async (password: string, token: string) => {
  // eslint-disable-next-line
  const reset = jwt.verify(token, process.env.JWT_SECRET!) as ResetPasswordToken

  // TODO maybe should just throw error
  if (Date.now() > reset.expires) {
    throw new Error("token expired")
  }

  const updatedUser = await changePassword(reset.id, password)
  return updatedUser
}

export const passwordResetUrl = async (userId: string): Promise<string> => {
  const oneDay = 1000 * 60 * 60 * 24
  const token = jwt.sign(
    {
      id: userId,
      expires: Date.now() + oneDay,
    },
    // eslint-disable-next-line
    process.env.JWT_SECRET!
  )
  const url = `${process.env.FRONTEND_URL}/reset-password/${token}`
  return url
}
