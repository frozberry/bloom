import type { NextApiRequest, NextApiResponse } from "next"
import verifyUser from "../../../lib/verifyUser"
import { getSortedGradedExams } from "../../../services/server/gradedExamService"

// Check NextApiResopnse<> type
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await verifyUser(req)
  if (!user) {
    return res.status(401).end("unauthoized token")
  }

  const gradedExams = await getSortedGradedExams(user.id)
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
