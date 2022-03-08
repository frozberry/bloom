import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import Answers from "../../../components/results/Answers"
import useAuthQuery from "../../../hooks/useAuthQuery"
import notifyError from "../../../lib/notifyError"
import { GradedExamWithGradedProblems } from "../../../lib/types"
import { createExamSession } from "../../../services/client/examSessionClient"
import { findGradedExamById } from "../../../services/client/gradedExamClient"

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { id } = router.query as { id: string }
  const { data, escape, component } = useAuthQuery(id, () =>
    findGradedExamById(id)
  )
  if (escape) return component

  const gradedExam = data as GradedExamWithGradedProblems

  const retryTest = async () => {
    if (
      window.confirm(
        "The test will take 45m and you will not be able to pause once you begin. Are you ready to start the test?"
      )
    ) {
      try {
        setLoading(true)
        await createExamSession(gradedExam.examId)
        setLoading(false)
        router.push("/session")
      } catch (e) {
        notifyError(e)
        setLoading(false)
      }
    }
  }

  return (
    <>
      {loading && <LinearProgress />}
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
            {Math.round(gradedExam.percent)}%
          </Typography>
          <Typography align="center">
            {`${gradedExam.marks}/${gradedExam.totalMarks}`} marks
          </Typography>
          <Button variant="contained" onClick={retryTest} sx={{ mt: 2 }}>
            Retry test
          </Button>
        </Paper>
        <Answers gradedProblems={gradedExam.gradedProblems} />
      </Container>
    </>
  )
}

export default Page
