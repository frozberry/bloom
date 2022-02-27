import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { getSortedTests } from "../../services/client/gradedExamClient"
import { StoredUser } from "../../lib/types"
import SingleAttempt from "../../components/results/SingleAttempt"
import MultipleAttempts from "../../components/results/MultipleAttempts"
import { UserContext } from "../_app"

const ResultsList = () => {
  const user = useContext(UserContext)

  const { isLoading, error, data } = useQuery(
    "gradedTestsData",
    // axios.get("/api/graded-exams/all").then((res) => res.data)
    () => getSortedTests(user!.token)
  )

  console.log("user", user)

  if (isLoading) return "Loading query..."
  if (error) return "Error"

  console.log("data", data)

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
