import type { NextApiRequest, NextApiResponse } from "next"
import { GradedExam } from "@prisma/client"
import verifyUser from "../../../lib/verifyUser"
import {
  getGradedTests,
  getUsersGradedTests,
} from "../../../services/gradedTestService"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const { all } = req.query

  if (all === "true") {
    const gradedTests = await getGradedTests()
    res.send(gradedTests)
  }

  const user = await verifyUser(req)
  if (!user) {
    return res.status(401).end("unauthoized token")
  }
  const gradedTests = await getUsersGradedTests(user.id)
  res.send(gradedTests)
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
