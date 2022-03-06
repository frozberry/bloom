import { Button, Container, Divider, Typography } from "@mui/material"
import { ExamSession } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Problem from "../../components/submission/Problem"
import useAuthQuery from "../../hooks/useAuthQuery"
import { ExamWithProblems, ProblemSubmission } from "../../lib/types"
import { findActiveExam } from "../../services/client/examSessionClient"
import { submitExam } from "../../services/client/gradedExamClient"

const Page = () => {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([])
  const { data, escape, component } = useAuthQuery(
    "examSession",
    findActiveExam
  )

  useEffect(() => {
    const json = localStorage.getItem("submissions")
    if (json) {
      const savedSubmissions = JSON.parse(json)
      setSubmissions(savedSubmissions)
    }
  }, [])

  if (escape) return component

  // TODO better way to check for no session
  if (!data) {
    router.push("/home")
    return null
  }

  const { exam, examSession } = data as {
    exam: ExamWithProblems
    examSession: ExamSession
  }

  const formatTime = (date: Date | Dayjs) => dayjs(date).format("hh:mma")
  const { start } = examSession
  const end = dayjs(start).add(45, "minute")

  const onClick = async () => {
    if (
      submissions.length === exam.problems.length ||
      window.confirm(
        "You have left some questions blank. Are you sure you want to submit your test?"
      )
    ) {
      try {
        const gradedExam = await submitExam(examSession.id, submissions)
        localStorage.removeItem("submissions")
        router.push(`results/graded-exams/${gradedExam.id}`)
        toast.success("Exam submitted successfully")
      } catch (e) {
        toast.error("error")
      }
    }
  }

  return (
    <Container sx={{ pt: 3 }}>
      <Typography>You have 45 minutes to complete this test</Typography>
      <Typography>Start: {formatTime(start)}</Typography>
      <Typography>End: {formatTime(end)}</Typography>
      {!examSession.firstAttempt && (
        <Button variant="outlined" color="inherit">
          Cancel attempt
        </Button>
      )}
      <Divider sx={{ my: 4 }} />

      {exam.problems.map((problem: any) => {
        return (
          <Problem
            problem={problem}
            viewOnly={false}
            key={problem.id}
            submissions={submissions}
            setSubmissions={setSubmissions}
          />
        )
      })}
      <Button onClick={onClick}>Submit</Button>
    </Container>
  )
}

export default Page
