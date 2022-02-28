import { StoredUser } from "./types"

const setAuthToken = () => {
  const loggedUserJson = localStorage.getItem("loggedWaterfrontUser")

  if (!loggedUserJson) {
    return undefined
  }

  const user: StoredUser = JSON.parse(loggedUserJson)

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  return config
}

export default setAuthToken
