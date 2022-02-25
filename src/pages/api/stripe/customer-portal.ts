import type { NextApiRequest, NextApiResponse } from "next"
import stripe from "../../../lib/stripeServer"

type PostBody = {
  customerId: string
}

type PostResponse = {
  url: string
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) => {
  const { customerId }: PostBody = req.body
  const returnUrl = process.env.FRONTEND

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  res.send({ url: portalSession.url })
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
