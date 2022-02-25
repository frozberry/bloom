import type { NextApiRequest, NextApiResponse } from "next"
import { deleteCategory } from "../../../services/categoryService"

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  name: string
) => {
  const success = await deleteCategory(name)

  if (!success) {
    return res.status(405).end("category not found")
  }

  res.status(200).end("category deleted")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query as { name: string }

  switch (req.method) {
    case "DELETE":
      DELETE(req, res, name)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
