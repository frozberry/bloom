import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"
import { findUserById } from "../services/server/userService"

const authUserSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      unauthorized: true,
      response: res.status(401).end("You must be logged in to do that"),
      userId: "",
    }
  }

  const user = await findUserById(session.id as string)

  if (!user?.active) {
    return {
      unauthorized: true,
      response: res.status(401).send({
        type: "inactiveSubscription",
        message: "Subscription is inactive",
      }),
      userId: "",
    }
  }

  return { unauthorized: false, userId: session.id as string }
}

export default authUserSession
