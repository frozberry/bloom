import type { NextApiRequest, NextApiResponse } from "next"
import { getProfiles } from "../../../services/server/userService"
import { UserProfile } from "../../../lib/types"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<UserProfile[]>
) => {
  const profiles = await getProfiles()
  res.send(profiles)
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
