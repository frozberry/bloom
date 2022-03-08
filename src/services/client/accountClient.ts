import axios from "axios"
import toast from "react-hot-toast"
import { AccountPageData } from "../../lib/types"

export const login = async (email: string, password: string) => {
  const data = {
    email,
    password,
  }
  const res = await axios.post<string>("/api/login", data)

  localStorage.setItem(
    "loggedWaterfrontUser",
    JSON.stringify({ token: res.data })
  )

  location.href = "/home"
  return res.data
}

export const signup = async (
  parentName: string,
  email: string,
  password: string
) => {
  const data = {
    parentName,
    email,
    password,
  }
  const res = await axios.post<string>("/api/users", data)

  return res.data
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const data = {
    currentPassword,
    newPassword,
  }

  await axios.put("/api/users/password", data)
  toast.success("Password updated successfully")

  return
}

export const isUserOAuth = async () => {
  const res = await axios.get<boolean>("/api/users/oauth")
  return res.data
}

export const getAccountPageData = async () => {
  const res = await axios.get<AccountPageData>("/api/users/account")
  return res.data
}
