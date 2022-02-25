import { Category } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  createCategory,
  getCatergories,
} from "../../../services/categoryService"

type PostBody = {
  name: string
}

const GET = async (req: NextApiRequest, res: NextApiResponse<Category[]>) => {
  const categories = await getCatergories()
  res.send(categories)
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<Category | null>
) => {
  const { name }: PostBody = req.body
  const category = await createCategory(name)
  res.send(category)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("handler")

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
