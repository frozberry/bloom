// import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/router"
import { QueryFunction, useQuery } from "react-query"
import Loading from "../components/Loading"
import { checkUserActive } from "../services/client/accountClient"
import { useSession } from "./useSession"

const NoUser = () => {
  const router = useRouter()
  router.push("/login")
  return null
}

const NoSub = () => {
  const router = useRouter()
  router.push("/select-plan")
  return null
}

type Payload = {
  data: any
  escape: boolean
  component: JSX.Element | null
}

const useAuthQuery = (key: string, queryFn: QueryFunction) => {
  const { isLoading, error, data } = useQuery(key, queryFn)
  const q2 = useQuery("active", checkUserActive)

  const { session } = useSession()

  const payload: Payload = {
    data,
    escape: false,
    component: null,
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

  if (q2?.data && !q2.data.active) {
    payload.escape = true
    payload.component = <NoSub />
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
