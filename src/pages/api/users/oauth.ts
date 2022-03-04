import type { NextApiRequest, NextApiResponse } from "next"
import { userIsOAuth } from "../../../services/server/userService"
import authenticateUserSession from "../../../lib/authenticateUserSession"

const GET = async (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  console.log("ouath runs")
  const { auth, userId, response } = await authenticateUserSession(req, res)
  if (!auth) {
    return response
  }

  const isOAuth = await userIsOAuth(userId)
  res.send(isOAuth)
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
