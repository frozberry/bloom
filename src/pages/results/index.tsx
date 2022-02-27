import { useEffect, useState } from "react"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { getSortedTests } from "../../services/client/gradedExamClient"
import { StoredUser } from "../../lib/types"
import SingleAttempt from "../../components/results/SingleAttempt"
import MultipleAttempts from "../../components/results/MultipleAttempts"

const ResultsList = () => {
  const [user, setUser] = useState<StoredUser>()

  useEffect(() => {
    const loggedUserJson = localStorage.getItem("loggedWaterfrontUser")
    if (loggedUserJson) {
      const u = JSON.parse(loggedUserJson)
      setUser(u)
    }
  }, [])

  const { isLoading, error, data } = useQuery(
    "gradedTestsData",
    // axios.get("/api/graded-exams/all").then((res) => res.data)
    () =>
      getSortedTests(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmYTVhMzhiLWU4ZmMtNDFhNy05NWQwLTA0ZjQzOGVjM2ZmMyIsImVtYWlsIjoicGFubmljb3BlQGdtYWlsLmNvbSIsImlhdCI6MTY0NTk5MzM2OX0.ehn90_RY-ryCEB--FRYkTXooRZI3D8a66ShjA_qlGoE"
      )
  )

  console.log(data)

  if (isLoading) return "Loading query..."

  if (!user) {
    return null
  }

  console.log(data)

  return (
    <Container>
      <div>{user.email}</div>

      {data.map((test: any) => {
        const multipleAttempts = test.attempts.length > 1

        if (multipleAttempts) {
          return <MultipleAttempts test={test} key={test.id} />
        }

        return <SingleAttempt gradedTest={test.attempts[0]} key={test.id} />
      })}
    </Container>
  )
}

export default ResultsList
