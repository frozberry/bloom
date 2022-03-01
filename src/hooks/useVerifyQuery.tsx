import Loading from "../components/Loading"
import { StoredUser } from "../lib/types"

type Check = {
  escape: boolean
  component?: JSX.Element
}

const useVerifyQuery = (
  user: StoredUser | null,
  isLoading: boolean,
  error: any
): Check => {
  if (isLoading) {
    return {
      escape: true,
      component: <Loading />,
    }
  }

  if (error) {
    return {
      escape: true,
      component: <p>Error: {error}</p>,
    }
  }

  if (!user) {
    return {
      escape: true,
      component: <p>You are not logged in</p>,
    }
  }

  return {
    escape: false,
  }
}

export default useVerifyQuery
