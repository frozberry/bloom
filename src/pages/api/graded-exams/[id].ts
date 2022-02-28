import { Exam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { findGradedExamById } from "../../../services/server/gradedExamService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<Exam | null>,
  id: string
) => {
  const exam = await findGradedExamById(id)
  res.send(exam)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
