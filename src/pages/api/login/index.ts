import type { NextApiRequest, NextApiResponse } from "next"
import { ServerError } from "../../../lib/types"
import { login } from "../../../services/server/userService"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ServerError>
) => {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body

      const token = await login(email, password)

      if (!token) {
        return res.status(401).send({
          type: "invalidLoginCredentials",
          message: "Email and password do not match",
        })
      }

      res.send(token)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
