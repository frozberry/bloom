import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { QueryFunction, useQuery } from "react-query"
import Loading from "../components/Loading"

const NoUser = () => {
  const router = useRouter()
  router.push("/")
  return null
}

type Payload = {
  data: any
  escape: boolean
  component?: JSX.Element
}

const useAuthQuery = (key: string, queryFn: QueryFunction) => {
  const { isLoading, error, data } = useQuery(key, queryFn)
  const { data: session } = useSession()

  const payload: Payload = {
    data,
    escape: false,
  }

  if (session === null) {
    payload.escape = true
    payload.component = <NoUser />
    return payload
  }

  if (isLoading || session === undefined) {
    payload.escape = true
    payload.component = <Loading />
    return payload
  }

  if (error) {
    payload.escape = true
    // @ts-ignore
    payload.component = <p>Error: {error.message}</p>
    return payload
  }

  return payload
}

export default useAuthQuery
