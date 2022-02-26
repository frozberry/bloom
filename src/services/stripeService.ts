import Stripe from "stripe"

// eslint-disable-next-line
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
})

export const getCustomerPortalUrl = async (customerId: string) => {
  const returnUrl = process.env.FRONTEND

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return portalSession.url
}
