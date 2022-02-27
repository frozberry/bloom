import { Problem, Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { createExam, getExams } from "../../../services/examService"

type PostBody = {
  // TODO should probably be ProbelmeCreateInput
  problems: Problem[]
}

const GET = async (req: NextApiRequest, res: NextApiResponse<Exam[]>) => {
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
