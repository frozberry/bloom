import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { ServerError } from "./types"

const notifyError = (e: any) => {
  // const error = e as AxiosError<ServerError>
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<ServerError>
    if (error?.response?.data.type === "notCredentialUser") {
      signIn("google", { callbackUrl: "/home" })
      return
    }
    toast.error(error.response?.data.message as string)
  } else {
    toast.error("Unexpected error")
  }
}

export default notifyError
