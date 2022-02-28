import { Button, Container, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import Answers from "../../components/Answers"
import { findGradedExamById } from "../../services/client/gradedExamClient"
import useVerifyApi from "../../useVerifyApi/foo"
import { UserContext } from "../_app"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { isLoading, error, data } = useQuery(id, () => findGradedExamById(id))
  const user = useContext(UserContext)
  const { escape, component } = useVerifyApi(user, isLoading, error)

  if (escape) return component
  const gt = data

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Paper
        sx={{
          px: 10,
          py: 4,
        }}
      >
        <Typography align="center" variant="h6">
          You scored
        </Typography>
        <Typography align="center" variant="h3">
          {gt.percent}%
        </Typography>
        <Typography align="center">
          {`${gt.marks}/${gt.total}`} marks
        </Typography>
        <Link href={`/exams/${id}`} passHref>
          <Button variant="contained" sx={{ mt: 2 }}>
            Retry test
          </Button>
        </Link>
      </Paper>
      <Answers gradedProblems={gt.gradedProblems} />
    </Container>
  )
}

export default Page
