import { Container } from "@mui/material"
import { getExamResultsOverview } from "../../services/client/gradedExamClient"
import SingleAttempt from "../../components/results/SingleExamAttempt"
import MultipleAttempts from "../../components/results/MultipleExamAttempts"
import useEscapeComponent from "../../hooks/useEscapeComponent"
import useAuthQuery from "../../hooks/useAuthQuery"

const ResultsList = () => {
  const { user, isLoading, error, data } = useAuthQuery(
    "gradedTestsData",
    getExamResultsOverview
  )
  const { escape, component } = useEscapeComponent(user, isLoading, error)

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
