import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../../prisma/client"

const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany()
  return users
}
