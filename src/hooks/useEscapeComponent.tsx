import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Loading from "../components/Loading"

type Escape = {
  escape: boolean
  component?: JSX.Element
}

const NoUser = () => {
  const router = useRouter()
  router.push("/")
  return null
}

const useEscapeComponent = (isLoading: boolean, error: any): Escape => {
  const { data } = useSession()
  const session = data

  if (session === null) {
    return {
      escape: true,
      component: <NoUser />,
    }
  }

  if (isLoading || session === undefined) {
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
