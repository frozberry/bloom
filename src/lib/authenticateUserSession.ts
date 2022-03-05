import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

const authenticateUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req })
  if (session) {
    return { unauthorized: false, userId: session.id as string }
  }
  return {
    auth: true,
    response: res.status(401).end("unauthorized"),
    userId: "",
  }
}

export default authenticateUserSession
