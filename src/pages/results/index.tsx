import { Container } from "@mui/material"
import MultipleAttempts from "../../components/results/MultipleExamAttempts"
import SingleAttempt from "../../components/results/SingleExamAttempt"
import useAuthQuery from "../../hooks/useAuthQuery"
import { ExamResultOverivew } from "../../lib/types"
import { getExamResultsOverview } from "../../services/client/gradedExamClient"

const ResultsList = () => {
  const { data, escape, component } = useAuthQuery(
    "gradedTestsData",
    getExamResultsOverview
  )
  if (escape) return component

  const examResultsOverview = data as ExamResultOverivew[]

  return (
    <Container>
      {examResultsOverview.map((test: any) => {
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
