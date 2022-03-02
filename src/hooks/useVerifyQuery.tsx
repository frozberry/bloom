import { Box, Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Loading from "../components/Loading"
import { StoredUser } from "../lib/types"

type Check = {
  escape: boolean
  component?: JSX.Element
}

const NoUser = () => {
  const router = useRouter()
  router.push("/")
  return null
}

const useVerifyQuery = (
  user: StoredUser | null | undefined,
  isLoading: boolean,
  error: any
): Check => {
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

export default useVerifyQuery
