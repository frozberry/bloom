import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"

import {
  createUser,
  editUser,
  findUserByEmail,
  getUsers,
} from "../../../services/server/userService"
import { ServerError, UserWithoutDate } from "../../../lib/types"
import authUserSession from "../../../lib/authUserSession"
import authAdminSession from "../../../lib/authAdminSession"

type PostBody = {
  parentName: string
  email: string
  password: string
}

type PutBody = {
  firstName: string
  lastName: string
  dob: string
  gender: string
}

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<UserWithoutDate[]>
) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const users = await getUsers()
  res.send(users)
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ServerError>
) => {
  const { parentName, email, password }: PostBody = req.body

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return res.status(400).send({
      type: "userAlreadyExists",
      message: "Account already exists, maybe you meant to log in?",
    })
  }

  const user = await createUser(parentName, email, password)
  res.send(user)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { firstName, lastName, dob, gender }: PutBody = req.body

  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const updatedUser = await editUser(userId, firstName, lastName, dob, gender)
  res.send(updatedUser)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    case "PUT":
      PUT(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
