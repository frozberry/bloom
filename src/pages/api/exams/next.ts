import { Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import verifyUser from "../../../lib/verifyUser"
import { getNextExam } from "../../../services/examService"

const GET = async (req: NextApiRequest, res: NextApiResponse<Exam | null>) => {
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end("unauthorized")
  }
  const nextExam = await getNextExam(user)

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
