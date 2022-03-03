import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

const checkSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    return { auth: true }
  }
  return {
    auth: false,
    response: res.status(401).end("unauthorized"),
  }
}

export default checkSession
