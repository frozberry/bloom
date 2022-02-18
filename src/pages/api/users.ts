import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/client"
import { User } from "@prisma/client"

import { createUser, getUsers } from "../../services/server/userService"

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
      const { parentName, email, password } = req.body
      const user = await createUser(parentName, email, password)
      res.send(user!)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
