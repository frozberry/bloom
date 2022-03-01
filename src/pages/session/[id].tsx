import { Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import useVerifyQuery from "../../hooks/useVerifyQuery"
import { findExamById } from "../../services/client/examClient"
import { UserContext } from "../_app"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { isLoading, error, data } = useQuery(id, () => findExamById(id))
  const user = useContext(UserContext)
  const { escape, component } = useVerifyQuery(user, isLoading, error)

  if (escape) return component

  const exam = data

  console.log(data)

  return (
    <Container>
      <Typography>{exam.id}</Typography>
      <Typography>{exam.num}</Typography>
      <Typography>{exam.date}</Typography>
      {exam.problems.map((problem) => {
        return (
          <div key={problem.id}>
            <Typography>{problem.question}</Typography>
            <Typography>{problem.correct}</Typography>
          </div>
        )
      })}
    </Container>
  )
}

export default Page
