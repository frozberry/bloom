import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import verifyUser from "../../../lib/verifyUser"
import { submitExam } from "../../../services/gradedExamService"

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
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end("unauthoized token")
  }

  const gradedExam = await submitExam(user, examId, answers)
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
