import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ApiError } from "./types"

const notifyError = (e: any) => {
  const error = e as AxiosError<ApiError>
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data.message as string)
  } else {
    toast.error("Unexpected error")
  }
}

export default notifyError
