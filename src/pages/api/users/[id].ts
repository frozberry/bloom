import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { deleteUser, findUserById } from "../../../services/server/userService"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) => {
  let { id } = req.query
  id = id as string

  switch (req.method) {
    case "GET":
      const user = await findUserById(id)
      res.send(user)
      break

    case "DELETE":
      const success = await deleteUser(id)

      if (!success) {
        res.status(405).end("user not found")
      }

      res.status(200).end("user deleted")
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
