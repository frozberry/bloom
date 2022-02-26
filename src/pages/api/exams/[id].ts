import { Test } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { deleteTest, findTestById } from "../../../services/examService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<Test | null>,
  id: string
) => {
  const test = await findTestById(id)
  res.send(test)
}

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  const success = await deleteTest(id)

  if (!success) {
    return res.status(405).end("test not found")
  }

  res.status(200).end("test deleted")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    case "DELETE":
      DELETE(req, res, id)

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
