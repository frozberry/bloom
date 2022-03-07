import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import toast from "react-hot-toast"

const stripePublic = process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
const url = "/api/stripe"

const stripePromise = loadStripe(stripePublic)

export const stripeCheckout = async (item: string, email: string) => {
  const stripe = await stripePromise

  const checkoutData = {
    item,
    email,
  }
  const response = await axios.post<{ id: string }>(
    `${url}/checkout`,
    checkoutData
  )
  const session = response.data

  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  })

  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
  if (result?.error?.message) {
    toast.error(result.error.message)
  }
}

export const stripePortal = async (customerId: string) => {
  const response = await axios.post(`${url}/customer-portal`, { customerId })

  return response.data.url
}
