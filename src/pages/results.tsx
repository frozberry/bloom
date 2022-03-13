import { Container } from "@mui/material"
import NoExamsTaken from "../components/NoExamsTaken"
import SingleAttempt from "../components/results/SingleExamAttempt"
import useAuthQuery from "../hooks/useAuthQuery"
import { GradedExamWithExam } from "../lib/types"
import { getUsersGradedExams } from "../services/client/gradedExamClient"

const ResultsList = () => {
  const { data, escape, component } = useAuthQuery(
    "usersGradedExams",
    getUsersGradedExams
  )
  if (escape) return component

  const gradedExams = data as GradedExamWithExam[]
  const firstAttempts = gradedExams

  if (gradedExams.length === 0) return <NoExamsTaken page="results" />

  return (
    <Container>
      {firstAttempts.map((gradedExam) => (
        <SingleAttempt key={gradedExam.id} gradedExam={gradedExam} />
      ))}
    </Container>
  )
}

export default ResultsList
