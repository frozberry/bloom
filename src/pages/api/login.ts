import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/client"
import { User } from "@prisma/client"

import { login } from "../../services/server/userService"

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body
      const token = await login(email, password)
      if (!token) {
        res.status(401).end("invalid email or password")
      }
      res.send(token!)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler