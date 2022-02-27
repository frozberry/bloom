import type { NextApiRequest, NextApiResponse } from "next"
import { findUserByEmail } from "../../../services/userService"
import jwt from "jsonwebtoken"

const bar = () => {
  console.log("hi")
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  // const user = await findUserByEmail("sf")
  throw new Error("this is an error message")
  res.status(200).end("default message")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
