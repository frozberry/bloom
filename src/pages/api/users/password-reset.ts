import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"
import { resetPassword } from "../../../services/userService"

type PutBody = {
  newPassword: string
  token: string
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<User | null>) => {
  const { newPassword, token }: PutBody = req.body

  if (newPassword.length < 3) {
    return res.status(400).end("password too short")
  }

  // as User can be deleted when I sort out error handling
  const updatedUser = (await resetPassword(newPassword, token)) as User
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
