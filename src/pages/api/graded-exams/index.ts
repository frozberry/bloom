import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import { getUsersGradedExams } from "../../../services/server/gradedExamService"
import authUserSession from "../../../lib/authUserSession"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedExams = await getUsersGradedExams(userId, false)
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
