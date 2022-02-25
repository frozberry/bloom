import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@prisma/client"

import { createUser, editUser, getUsers } from "../../services/userService"
import verifyUser from "../../lib/verifyUser"
import { getCatergoriesAverage } from "../../services/gradedTestService"

const GET = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const { average } = req.query

  if (average === "true") {
    const averages = await getCatergoriesAverage()
    res.send(averages)
  } else {
    const users = await getUsers()
    res.send(users)
  }
  const users = await getUsers()
  res.send(users)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
