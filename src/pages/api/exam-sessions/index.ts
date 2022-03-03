import { ExamSession } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authenticateUserSession from "../../../lib/authenticateUserSession"
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
  const { auth, userId, response } = await authenticateUserSession(req, res)
  if (!auth) {
    return response
  }

  const examSession = await findUsersExamSession(userId)
  res.send(examSession)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { examId }: PostBody = req.body

  const { auth, userId, response } = await authenticateUserSession(req, res)
  if (!auth) {
    return response
  }

  const examSession = await createExamSession(userId, examId)
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
