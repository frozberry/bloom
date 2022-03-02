import { useRouter } from "next/router"
import Loading from "../components/Loading"
import { StoredUser } from "../lib/types"

type Escape = {
  escape: boolean
  component?: JSX.Element
}

const NoUser = () => {
  const router = useRouter()
  router.push("/")
  return null
}

const useEscapeComponent = (
  user: StoredUser | null | undefined,
  isLoading: boolean,
  error: any
): Escape => {
  if (user === null) {
    return {
      escape: true,
      component: <NoUser />,
    }
  }

  if (isLoading || user === undefined) {
    return {
      escape: true,
      component: <Loading />,
    }
  }

  if (error) {
    return {
      escape: true,
      component: <p>Error: {error.message}</p>,
    }
  }

  return {
    escape: false,
  }
}

export default useEscapeComponent
