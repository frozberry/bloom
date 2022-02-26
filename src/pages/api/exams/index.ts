import { Category, Problem, Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import verifyUser from "../../../lib/verifyUser"
import {
  createExam,
  getNextExam,
  getExams,
} from "../../../services/examService"

type PostBody = {
  problems: (Problem & { categories: Category[] })[]
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { next } = req.query

  const user = await verifyUser(req)

  if (next === "true") {
    if (!user) {
      return res.status(401).end("unauthorized")
    }
    const nextExam = await getNextExam(user)
    return res.send(nextExam)
  }

  const exams = await getExams()
  res.send(exams)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<Exam | null>) => {
  const { problems }: PostBody = req.body
  const exam = await createExam(problems)
  res.send(exam)
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
