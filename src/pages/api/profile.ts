import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"

import authUserSession from "../../lib/authUserSession"
import { editUser, findUserById } from "../../services/server/userService"

type PostBody = {
  firstName: string
  lastName: string
  dob: string
  gender: string
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  console.log(userId)
  if (unauthorized) return response
  console.log(userId)

  const users = await findUserById(userId)
  res.send(users)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const { firstName, lastName, dob, gender }: PostBody = req.body
  const editProfile = editUser(userId, firstName, lastName, dob, gender)

  res.send(editProfile)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
