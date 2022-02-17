import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/client"

type Data = {
  name: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data[]>) => {
  const allUsers = await prisma.user.findMany()

  res.send(allUsers)
}

export default handler
