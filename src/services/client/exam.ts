import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/exams"

export const getExams = async () => {
  const response = await axios.get(url)
  return response.data
}

export const getNextExam = async () => {
  const config = setAuthToken()

  const response = await axios.get(`${url}/next`, config)
  return response.data
}
