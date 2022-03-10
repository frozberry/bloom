import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { AccountPageData } from "../../../lib/types"
import {
  findUserById,
  getUsersAccountPage,
} from "../../../services/server/userService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<{ active: boolean }>
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = (await findUserById(userId)) as User
  res.send({ active: user?.active })
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
