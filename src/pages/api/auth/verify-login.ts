import type { NextApiRequest, NextApiResponse } from "next"
import { findUserByEmail } from "../../../services/server/userService"
import { ServerError } from "../../../lib/types"

type PostBody = {
  parentName: string
  email: string
  password: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse<ServerError>) => {
  const { email }: PostBody = req.body

  const existingUser = await findUserByEmail(email)

  if (!existingUser?.passwordHash) {
    return res.status(400).send({
      type: "notCredentialUser",
      message: "use google",
    })
  }

  res.status(200).end()
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
