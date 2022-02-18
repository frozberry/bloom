import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../../prisma/client"

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany()
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
): Promise<User | null> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { parentName, email, passwordHash },
  })

  return user
}

export const editUser = async (
  user: User,
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
    where: { id: user.id },
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

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await findUserByEmail(email)
  if (!user) {
    return null
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    return null
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  )

  return token
}
