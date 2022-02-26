import type { NextApiRequest, NextApiResponse } from "next"
import { GradedCategory } from "@prisma/client"
import verifyUser from "../../../lib/verifyUser"
import {
  getCatergoriesAverage,
  getUsersGradedCategories,
} from "../../../services/gradedCategoryService"
import { CategoryWithAverage } from "../../../lib/types"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryWithAverage[] | GradedCategory[]>
) => {
  const { average } = req.query

  if (average === "true") {
    const averages = await getCatergoriesAverage()
    res.send(averages)
  }

  const user = await verifyUser(req)

  if (!user) {
    return res.status(401).end()
  }

  const gradedCategories = await getUsersGradedCategories(user)
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
