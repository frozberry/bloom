import axios from "axios"

const url = "/api/graded-exams"

export const getSortedTests = async () => {
  console.log("get sorted tests")

  let user
  const loggedUserJson = localStorage.getItem("loggedWaterfrontUser")
  if (loggedUserJson) {
    user = JSON.parse(loggedUserJson)
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const response = await axios.get(`${url}/test-sorted`, config)
  return response.data
}
