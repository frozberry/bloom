import axios from "axios"
import nameCase from "../../lib/nameCase"

const url = "/api/profile"

export const findUsersProfile = async () => {
  const res = await axios.get<string>(url)
  return res.data
}

export const updateProfile = async (
  firstName: string,
  lastName: string,
  dob: string,
  gender: string
) => {
  const data = {
    firstName: nameCase(firstName),
    lastName: nameCase(lastName),
    dob: new Date(dob),
    gender,
  }

  const res = await axios.post(url, data)
  return res.data
}
