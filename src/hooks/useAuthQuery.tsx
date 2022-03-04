import { QueryFunction, useQuery } from "react-query"

const useAuthQuery = (key: string, queryFn: QueryFunction) => {
  const { isLoading, error, data } = useQuery(key, queryFn)

  return { isLoading, error, data }
}

export default useAuthQuery
