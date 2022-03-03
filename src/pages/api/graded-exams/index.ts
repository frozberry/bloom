import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import { getUsersGradedExams } from "../../../services/server/gradedExamService"
import checkSession from "../../../lib/checkSession"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const { auth, userId, response } = await checkSession(req, res)
  if (!auth) {
    return response
  }
  const gradedExams = await getUsersGradedExams(userId)
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
