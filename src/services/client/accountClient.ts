import axios from "axios"
import toast from "react-hot-toast"
import setAuthToken from "../../lib/setAuthToken"

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

  localStorage.setItem(
    "loggedWaterfrontUser",
    JSON.stringify({ token: res.data })
  )

  location.href = "/home"

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
  const config = setAuthToken()

  await axios.put("/api/users/password", data, config)
  toast.success("Password updated successfully")

  return
}
