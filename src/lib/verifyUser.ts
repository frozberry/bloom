import { User } from "@prisma/client"
import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import { findUserById } from "../services/server/userService"

const verifyUser = async (req: NextApiRequest): Promise<User | null> => {
  // TODO maybe can type the session properly
  const session = await getSession({ req })

  if (!session) {
    return null
  }

  const user = await findUserById(session.id as string)

  return user
}

export default verifyUser
