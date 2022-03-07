import axios from "axios"

export const gu = async () => {
  const res = await axios.get<string>("/api/profile")
  return res.data
}
