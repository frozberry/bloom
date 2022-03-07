import { Box, Button, Container, Divider, Typography } from "@mui/material"
import { ExamSession } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Problem from "../components/submission/Problem"
import useAuthQuery from "../hooks/useAuthQuery"
import { ExamWithProblems, ProblemSubmission } from "../lib/types"
import {
  deleteExamSession,
  findActiveExam,
} from "../services/client/examSessionClient"
import { submitExam } from "../services/client/gradedExamClient"

const Page = () => {
  const router = useRouter()
  const [remainingMillis, setRemainingMillis] = useState<number>(1_000_000_000)
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.examSession) {
        const examSession = data.examSession as ExamSession
        const start = dayjs(examSession.start).valueOf()
        const end = dayjs(start).add(45, "minute")

        const timeLeft = end.valueOf() - dayjs().valueOf()
        if (timeLeft < 0) {
          setRemainingMillis(0)
          finishExam()
          return
        }
        setRemainingMillis(timeLeft)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

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
  const remainingMillisFormat = dayjs(remainingMillis).format("mm:ss")

  const tryFinishExam = async () => {
    if (
      submissions.length === exam.problems.length ||
      window.confirm(
        "You have left some questions blank. Are you sure you want to submit your test?"
      )
    ) {
      await finishExam()
    }
  }

  const finishExam = async () => {
    try {
      const gradedExam = await submitExam(examSession.id, submissions)
      localStorage.removeItem("submissions")
      router.push(`results/graded-exams/${gradedExam.id}`)
      toast.success("Exam submitted successfully")
    } catch (e) {
      toast.error("error")
    }
  }

  const cancelAttempt = async () => {
    if (window.confirm("Are you sure you want to cancel your test?")) {
      await deleteExamSession()
      router.push("/results")
    }
  }

  return (
    <Container sx={{ pt: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography>You have 45 minutes to complete this test</Typography>
        <Typography>Start: {formatTime(start)}</Typography>
        <Typography>End: {formatTime(end)}</Typography>
        <Typography display="inline">Time remaining: </Typography>
        {remainingMillis <= 45 * 60 * 1000 && (
          <Typography display="inline">{remainingMillisFormat}s</Typography>
        )}
      </Box>

      {!examSession.firstAttempt && (
        <Button variant="outlined" color="inherit" onClick={cancelAttempt}>
          Cancel attempt
        </Button>
      )}
      <Divider sx={{ my: 4 }} />

      {exam.problems.map((problem: any) => {
        return (
          <Problem
            problem={problem}
            key={problem.id}
            submissions={submissions}
            setSubmissions={setSubmissions}
          />
        )
      })}
      <Button onClick={tryFinishExam} variant="contained" size="large">
        Submit test
      </Button>
    </Container>
  )
}

export default Page
