import { LoginOutlined } from "@mui/icons-material"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/client"
import { User } from "@prisma/client"

const handler = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  switch (req.method) {
    case "GET":
      const allUsers = await prisma.user.findMany()

      res.send(allUsers)
      break

    case "POST":
      // handlePost()
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
