import axios from "axios"

export const login = async (email: string, password: string) => {
  const data = {
    email,
    password,
  }
  const response = await axios.post("/api/login", data)
  return response.data
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
  const response = await axios.post("/api/users", data)
  return response.data
}
