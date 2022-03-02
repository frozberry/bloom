import { useContext } from "react"
import { QueryFunction, useQuery } from "react-query"
import { UserContext } from "../pages/_app"

const useAuthQuery = (key: string, queryFn: QueryFunction) => {
  const { isLoading, error, data } = useQuery(key, queryFn)
  const user = useContext(UserContext)

  return { user, isLoading, error, data }
}

export default useAuthQuery
