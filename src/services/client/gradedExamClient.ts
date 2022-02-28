import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/graded-exams"

export const findExamById = async (id: string) => {
  const config = setAuthToken()

  const response = await axios.get(`${url}/${id}`, config)
  return response.data
}

export const getSortedExams = async () => {
  const config = setAuthToken()

  const response = await axios.get(`${url}/test-sorted`, config)
  return response.data
}
