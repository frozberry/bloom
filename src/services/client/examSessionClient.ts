import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/exam-sessions"

export const findUsersExamSession = async () => {
  const config = setAuthToken()

  const response = await axios.get(url, config)
  return response.data
}

export const createTestSession = async () => {
  // const config = setAuthToken()
  // const response = await axios.get(`${url}/next`, config)
  // return response.data
}