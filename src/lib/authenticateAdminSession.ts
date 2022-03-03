import { User } from "@prisma/client"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"
import { findUserById } from "../services/server/userService"

const authenticateAdminSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req })
  console.log(session)

  if (!session) {
    return {
      auth: false,
      response: res.status(401).end("unauthorized"),
      userId: "",
    }
  }

  const user = (await findUserById(session.id as string)) as User

  if (!user.admin) {
    return {
      auth: false,
      response: res.status(401).end("admin"),
      userId: "",
    }
  }

  return {
    auth: true,
    userId: session.id as string,
  }
}

export default authenticateAdminSession
