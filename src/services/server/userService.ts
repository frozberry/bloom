import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import { getActiveElement } from "formik"
import jwt from "jsonwebtoken"
import { prisma } from "../../prisma/client"

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany()
  return users
}

export const findUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

export const createUser = async (
  parentName: string,
  email: string,
  password: string
): Promise<User | null> => {
  const passwordHash = password

  const user = await prisma.user.create({
    data: { parentName, email, passwordHash },
  })

  return user
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const user = await findUser(id)
  if (!user) {
    return false
  }

  await prisma.user.delete({ where: { id } })
  return true
}
