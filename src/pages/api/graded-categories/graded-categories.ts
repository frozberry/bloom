import { GradedCategory } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { CategoryWithAverage } from "../../../lib/types"
import {
  getCatergoriesAverage,
  getUsersGradedCategories,
  getUsersGradedCategoriesWithAverage,
} from "../../../services/server/gradedCategoryService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryWithAverage[] | GradedCategory[]>
) => {
  const { average } = req.query
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  if (average === "true") {
    const averages = await getUsersGradedCategoriesWithAverage(userId)
    res.send(averages)
  }

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
