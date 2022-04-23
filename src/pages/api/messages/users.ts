import { Message } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { prisma } from "../../../prisma/client"

type PostBody = {
  name: string
  email: string
  message: string
}

const GET = async (req: NextApiRequest, res: NextApiResponse<Message[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response
  const m = await prisma.message.findMany()
  res.send(m)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<Message>) => {
  const { name, email, message }: PostBody = req.body

  const m = await prisma.message.create({
    data: {
      // Forgot to add uuid to db, don't want to remigrate
      id: `${name}${Date.now()}`,
      name,
      email,
      message,
    },
  })

  res.send(m)
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
