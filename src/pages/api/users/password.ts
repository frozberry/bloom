import type { NextApiRequest, NextApiResponse } from "next"
import { ServerError } from "../../../lib/types"
import verifyUser from "../../../lib/verifyUser"
import {
  changePassword,
  findUserById,
  validatePassword,
} from "../../../services/server/userService"

type PutBody = {
  currentPassword: string
  newPassword: string
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<ServerError>) => {
  const { currentPassword, newPassword }: PutBody = req.body
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).send({
      type: "userNotFound",
      message: "User not found",
    })
  }

  if (newPassword.length < 3) {
    return res.status(400).send({
      type: "passwordTooShort",
      message: "Password must be at least 3 characters long",
    })
  }

  const passwordCorrect = await validatePassword(
    currentPassword,
    user.passwordHash
  )

  if (!passwordCorrect) {
    return res.status(400).send({
      type: "incorrectPassword",
      message: "Password is incorrect",
    })
  }

  await changePassword(user.id, newPassword)
  res.status(200).end()
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
