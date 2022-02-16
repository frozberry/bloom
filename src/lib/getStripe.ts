import { Stripe, loadStripe } from "@stripe/stripe-js"

const stripePublic = process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublic)
  }
  return stripePromise
}

export default getStripe
