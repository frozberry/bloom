import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/client"
import { User } from "@prisma/client"

import {
  createUser,
  editUser,
  getUsers,
} from "../../services/server/userService"
import verifyUser from "../../lib/verifyUser"

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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User[] | User>
) => {
  switch (req.method) {
    case "GET":
      const allUsers = await getUsers()
      res.send(allUsers)
      break

    case "POST":
      const { parentName, email, password }: PostBody = req.body
      const user = await createUser(parentName, email, password)
      res.send(user!)
      break

    case "PUT":
      const { firstName, lastName, dob, gender }: PutBody = req.body
      const userVerified = await verifyUser(req)

      if (!userVerified) {
        res.status(401).end()
      }

      const updatedUser = await editUser(
        userVerified!,
        firstName,
        lastName,
        dob,
        gender
      )

      res.send(updatedUser!)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
