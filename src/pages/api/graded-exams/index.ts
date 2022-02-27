import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import verifyUser from "../../../lib/verifyUser"
import { getUsersGradedExams } from "../../../services/gradedExamService"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const user = await verifyUser(req)
  if (!user) {
    return res.status(401).end("unauthoized token")
  }
  const gradedExams = await getUsersGradedExams(user.id)
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