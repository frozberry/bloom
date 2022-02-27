import axios from "axios"

const url = "/api/graded-exams"

export const getSortedTests = async (token: string) => {
  console.log("get sorted tests")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${url}/test-sorted`, config)
  return response.data
}
