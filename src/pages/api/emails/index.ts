import type { NextApiRequest, NextApiResponse } from "next"
import sendEmail from "../../../lib/sendEmail"
import { findUserByEmail } from "../../../services/userService"
import jwt from "jsonwebtoken"

type PostBody = {
  email: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: PostBody = req.body
  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(401).end("email not found")
  }

  const userForToken = {
    email: user.email,
    id: user.id,
  }

  // TODO rework the reset password flow
  const token = jwt.sign(userForToken, user.passwordHash)
  const resetUrl = `${process.env.FRONTEND}/reset-password/?token=${token}&id=${user.id}`

  sendEmail.passwordReset(user.email, resetUrl)

  res.status(200).end(`email sent to ${user.email}`)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("handler")

  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
