import { useContext } from "react"
import { Container } from "@mui/material"
import { useQuery } from "react-query"
import { getSortedExams } from "../../services/client/gradedExamClient"
import SingleAttempt from "../../components/results/SingleAttempt"
import MultipleAttempts from "../../components/results/MultipleAttempts"
import { UserContext } from "../_app"
import Loading from "../../components/Loading"

const ResultsList = () => {
  const { isLoading, error, data } = useQuery("gradedTestsData", getSortedExams)
  const user = useContext(UserContext)

  if (!user) return "No user"
  if (isLoading) return <Loading />
  if (error) return "Error"

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
