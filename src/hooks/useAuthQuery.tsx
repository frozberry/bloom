import { useSession } from "next-auth/react"
import { QueryFunction, useQuery } from "react-query"

const useAuthQuery = (key: string, queryFn: QueryFunction) => {
  const { isLoading, error, data } = useQuery(key, queryFn)
  const { data: session } = useSession()

  return { session, isLoading, error, data }
}

export default useAuthQuery
