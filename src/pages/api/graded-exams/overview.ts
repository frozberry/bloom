import type { NextApiRequest, NextApiResponse } from "next"
import authenticateUserSession from "../../../lib/authenticateUserSession"
import { getExamResultsOverview } from "../../../services/server/gradedExamService"

// Check NextApiResopnse<> type
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { auth, userId, response } = await authenticateUserSession(req, res)
  if (!auth) {
    return response
  }

  const gradedExams = await getExamResultsOverview(userId)
  res.send(gradedExams)
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
