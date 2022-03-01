import { ExamSession } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import verifyUser from "../../../lib/verifyUser"
import {
  createExamSession,
  findUsersExamSession,
} from "../../../services/server/examSessionService"

type PostBody = {
  examId: string
}

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<ExamSession | null>
) => {
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end()
  }

  const examSession = await findUsersExamSession(user.id)
  res.send(examSession)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { examId }: PostBody = req.body
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end()
  }

  const examSession = await createExamSession(user.id, examId)
  res.send(examSession)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
