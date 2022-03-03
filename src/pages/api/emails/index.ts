import type { NextApiRequest, NextApiResponse } from "next"
import { findUserByEmail } from "../../../services/server/userService"
import { sendPasswordResetEmail } from "../../../services/server/emailService"

type PostBody = {
  email: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: PostBody = req.body
  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(401).end("email not found")
  }

  sendPasswordResetEmail(user.id, user.email)

  res.status(200).end(`email sent to ${user.email}`)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
