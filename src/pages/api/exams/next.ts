import { Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import checkSession from "../../../lib/checkSession"
import { getNextExam } from "../../../services/server/examService"

const GET = async (req: NextApiRequest, res: NextApiResponse<Exam | null>) => {
  const { auth, userId, response } = await checkSession(req, res)
  if (!auth) {
    return response
  }

  const nextExam = await getNextExam(userId)

  res.send(nextExam)
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
