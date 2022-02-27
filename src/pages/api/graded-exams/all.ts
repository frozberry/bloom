import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import { getGradedExams } from "../../../services/server/gradedExamService"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const gradedExams = await getGradedExams()
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
