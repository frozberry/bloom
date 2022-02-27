import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"
import {
  changePassword,
  findUserById,
  validatePassword,
} from "../../../services/userService"

type PutBody = {
  userId: string
  currentPassword: string
  newPassword: string
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<User | null>) => {
  const { userId, currentPassword, newPassword }: PutBody = req.body

  const user = await findUserById(userId)
  if (!user) {
    return res.status(401).end("user not found")
  }

  if (newPassword.length < 3) {
    return res.status(400).end("password too short")
  }

  const passwordCorrect = await validatePassword(user, currentPassword)

  if (!passwordCorrect) {
    return res.status(400).end("password too short")
  }

  const updatedUser = await changePassword(userId, newPassword)
  res.send(updatedUser)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PUT":
      PUT(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
