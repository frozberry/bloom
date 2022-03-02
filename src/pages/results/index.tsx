import { useContext } from "react"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { getSortedExams } from "../../services/client/gradedExamClient"
import SingleAttempt from "../../components/results/SingleExamAttempt"
import MultipleAttempts from "../../components/results/MultipleExamAttempts"
import { UserContext } from "../_app"
import useVerifyQuery from "../../hooks/useVerifyQuery"

const ResultsList = () => {
  const { isLoading, error, data } = useQuery("gradedTestsData", getSortedExams)
  const user = useContext(UserContext)
  const { escape, component } = useVerifyQuery(user, isLoading, error)

  if (escape) return component

  return (
    <Container>
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
