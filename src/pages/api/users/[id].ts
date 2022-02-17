import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../prisma/client"

type User = {
  name: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) => {
  let {
    query: { id },
  } = req

  switch (req.method) {
    case "GET":
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      res.send(user)
      break

    case "DELETE":
      await prisma.user.delete({ where: { id: Number(id) } })
      res.status(200)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
