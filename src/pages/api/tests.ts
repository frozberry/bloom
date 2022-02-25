import { Category, Prisma, Problem, Test } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { createTest, getTests } from "../../services/testService"

type PostBody = {
  problems: (Problem & { categories: Category[] })[]
}

const GET = async (req: NextApiRequest, res: NextApiResponse<Test[]>) => {
  const tests = await getTests()
  res.send(tests)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<Test>) => {
  const { problems }: PostBody = req.body
  const test = await createTest(problems)
  res.send(test!)
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
