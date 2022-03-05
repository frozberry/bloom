import { Button, Container, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import Answers from "../../components/Answers"
import { findGradedExamById } from "../../services/client/gradedExamClient"
import useAuthQuery from "../../hooks/useAuthQuery"
import { GradedExamWithGradedProblems } from "../../lib/types"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data, escape, component } = useAuthQuery(id, () =>
    findGradedExamById(id)
  )
  if (escape) return component

  const gradedExam = data as GradedExamWithGradedProblems

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Paper sx={{ px: 10, py: 4 }}>
        <Typography align="center" variant="h6">
          You scored
        </Typography>
        <Typography align="center" variant="h3">
          {gradedExam.percent}%
        </Typography>
        <Typography align="center">
          {`${gradedExam.marks}/${gradedExam.total}`} marks
        </Typography>
        <Link href={`/exams/${id}`} passHref>
          <Button variant="contained" sx={{ mt: 2 }}>
            Retry test
          </Button>
        </Link>
      </Paper>
      <Answers gradedProblems={gradedExam.gradedProblems} />
    </Container>
  )
}

export default Page
