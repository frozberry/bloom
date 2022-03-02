import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/graded-exams"

export const findGradedExamById = async (id: string) => {
  const config = setAuthToken()

  const res = await axios.get(`${url}/${id}`, config)
  return res
}

export const getSortedExams = async () => {
  const config = setAuthToken()

  const res = await axios.get(`${url}/test-sorted`, config)
  return res
}
