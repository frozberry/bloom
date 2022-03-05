import { GradedExam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { ProblemSubmission } from "../../../lib/types"
import { submitExam } from "../../../services/server/gradedExamService"

type PostBody = {
  examId: string
  submissions: ProblemSubmission[]
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<GradedExam | null>
) => {
  const { examId, submissions }: PostBody = req.body

  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedExam = await submitExam(userId, examId, submissions)
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
