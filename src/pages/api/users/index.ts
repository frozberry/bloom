import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"

import { createUser, editUser, getUsers } from "../../../services/userService"
import verifyUser from "../../../lib/verifyUser"

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

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await getUsers()
  res.send(users)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { parentName, email, password }: PostBody = req.body
  const user = await createUser(parentName, email, password)
  res.send(user!)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { firstName, lastName, dob, gender }: PutBody = req.body
  const user = await verifyUser(req)
  if (!user) {
    return res.status(401).end()
  }
  const updatedUser = await editUser(user!, firstName, lastName, dob, gender)
  res.send(updatedUser!)
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
