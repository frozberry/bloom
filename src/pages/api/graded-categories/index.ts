import type { NextApiRequest, NextApiResponse } from "next"
import { GradedCategory } from "@prisma/client"
import {
  getCatergoriesAverage,
  getUsersGradedCategories,
} from "../../../services/server/gradedCategoryService"
import { CategoryWithAverage } from "../../../lib/types"
import authUserSession from "../../../lib/authUserSession"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryWithAverage[] | GradedCategory[]>
) => {
  const { average } = req.query

  // TODO move to own route
  if (average === "true") {
    const averages = await getCatergoriesAverage()
    res.send(averages)
  }

  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedCategories = await getUsersGradedCategories(userId)
  res.send(gradedCategories)
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
