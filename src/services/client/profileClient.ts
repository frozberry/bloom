import axios from "axios"
import nameCase from "../../lib/nameCase"
import { UserProfile } from "../../lib/types"

const url = "/api/profile"

export const findUsersProfile = async () => {
  const res = await axios.get<UserProfile>(url)
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

  const res = await axios.put(url, data)
  return res.data
}
