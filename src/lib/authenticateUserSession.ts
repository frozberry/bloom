import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

const authenticateUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req })
  console.log("session:", session)
  if (session) {
    return { auth: true, userId: session.id as string }
  }
  return {
    auth: false,
    response: res.status(401).end("unauthorized"),
    userId: "",
  }
}

export default authenticateUserSession
