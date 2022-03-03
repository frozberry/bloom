import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "../prisma/client"

type Token = {
  id: string
  email: string
}

const verifyUser = async (req: NextApiRequest): Promise<User | null> => {
  // const { authorization } = req.headers
  // if (!authorization) {
  //   return null
  // }

  // const token = authorization.substring(7)

  // // eslint-disable-next-line
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as Token

  // if (!decodedToken) {
  //   return null
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: decodedToken.id,
  //   },
  // })
  const session = await getSession({ req })

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  })

  return user
}

export default verifyUser
