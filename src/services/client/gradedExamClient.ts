import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/graded-exams"

export const getSortedTests = async () => {
  const config = setAuthToken()

  const response = await axios.get(`${url}/test-sorted`, config)
  return response.data
}
