import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ServerError } from "./types"

const notifyError = (e: any) => {
  const error = e as AxiosError<ServerError>
  if (axios.isAxiosError(error)) {
    const error = e as AxiosError<ServerError>
    toast.error(error.response?.data.message as string)
  } else {
    toast.error("Unexpected error")
  }
}

export default notifyError
