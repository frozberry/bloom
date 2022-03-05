import { User } from "@prisma/client"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"
import { findUserById } from "../services/server/userService"

const authAdminSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      unauthorized: true,
      response: res.status(401).end("unauthorized"),
    }
  }

  const user = (await findUserById(session.id as string)) as User

  if (!user.admin) {
    return {
      unauthorized: true,
      response: res.status(401).end("admin"),
    }
  }

  return {
    unauthorized: false,
  }
}

export default authAdminSession
