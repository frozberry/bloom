import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { deleteUser, findUserById } from "../../../services/server/userService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<User>,
  id: string
) => {
  const user = await findUserById(id)
  res.send(user!)
}

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  const success = await deleteUser(id)

  if (!success) {
    return res.status(405).end("user not found")
  }

  res.status(200).end("user deleted")
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    case "DELETE":
      DELETE(req, res, id)

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
