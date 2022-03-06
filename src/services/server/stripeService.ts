import Stripe from "stripe"
import { findUserByEmail } from "./userService"

// eslint-disable-next-line
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
})

export const createCheckoutSession = async (item: string, email: string) => {
  let price
  if (item === "month") {
    price = process.env.STRIPE_PRICE_MONTH
  }
  if (item === "year") {
    price = process.env.STRIPE_PRICE_YEAR
  }

  const successUrl = `${process.env.FRONTEND}/home`
  const cancelUrl = `${process.env.FRONTEND}/select-plan`

  const user = await findUserByEmail(email)
  const previouslySubscribed = user?.stripeId

  const sessionData: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {},
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  if (previouslySubscribed) {
    sessionData.customer = user.stripeId as string
  } else {
    const subscriptionData = { trial_period_days: 14 }
    sessionData.customer_email = email
    sessionData.subscription_data = subscriptionData
  }

  const session = await stripe.checkout.sessions.create(sessionData)
  return { id: session.id }
}

export const getCustomerPortalUrl = async (customerId: string) => {
  const returnUrl = process.env.FRONTEND

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return portalSession.url
}
