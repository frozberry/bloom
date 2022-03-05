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
      {examResultsOverview.map((examResult: ExamResultOverivew) => {
        const multipleAttempts = examResult.attempts.length > 1

        if (true) {
          return <MultipleAttempts exam={examResult} key={examResult.examId} />
        }

        return <SingleAttempt exam={exam} key={exam.id} />
      })}
    </Container>
  )
}

export default ResultsList
