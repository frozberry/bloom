import type { NextApiRequest, NextApiResponse } from "next"

type PostBody = {
  customerId: string
}

// TODO
const POST = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  const { customerId }: PostBody = req.body
  res.send("unimplemented")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
