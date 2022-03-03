import { Problem } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getProblems } from "../../../services/server/problemService"

const GET = async (req: NextApiRequest, res: NextApiResponse<Problem[]>) => {
  const categories = await getProblems()
  res.send(categories)
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
