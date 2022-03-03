import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import { submitExam } from "../../../services/server/gradedExamService"
import authenticateUserSession from "../../../lib/authenticateUserSession"

// TODO use proper type
type PostBody = {
  examId: string
  answers: any
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<GradedExam | null>
) => {
  const { examId, answers }: PostBody = req.body

  const { auth, userId, response } = await authenticateUserSession(req, res)
  if (!auth) {
    return response
  }

  const gradedExam = await submitExam(userId, examId, answers)
  res.send(gradedExam)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
