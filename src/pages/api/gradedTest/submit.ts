import type { NextApiRequest, NextApiResponse } from "next"
import { GradedTest } from "@prisma/client"
import verifyUser from "../../../lib/verifyUser"
import { submitTest } from "../../../services/gradedTestService"

// TODO use proper type
type PostBody = {
  testId: string
  answers: any
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<GradedTest | null>
) => {
  const { testId, answers }: PostBody = req.body
  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end("unauthoized token")
  }

  const gradedTest = await submitTest(user, testId, answers)
  res.send(gradedTest)
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
