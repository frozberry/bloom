import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { StripeCheckoutBody } from "../../pages/api/stripe/checkout"

const stripePublic = process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
const url = "/api/stripe"

const stripePromise = loadStripe(stripePublic)

export const stripeCheckout = async (item: string, email: string) => {
  // Get Stripe.js instance
  const stripe = await stripePromise

  // Call your backend to create the Checkout Session
  const checkoutData = {
    item,
    email,
  }
  const response = await axios.post(`${url}/checkout`, checkoutData)

  const session = response.data

  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  })

  if (result?.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
}

export const stripePortal = async (customerId: string) => {
  const response = await axios.post(`${url}/customer-portal`, { customerId })

  return response.data.url
}
