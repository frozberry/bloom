import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { ExamSession, GradedProblem, Problem } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import _ from "lodash"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useAuthQuery from "../../hooks/useAuthQuery"
import { ExamWithProblems, ProblemSubmission } from "../../lib/types"
import { findActiveExam } from "../../services/client/examSessionClient"

type Props = {
  problem: GradedProblem
  viewOnly: boolean
  submissions: ProblemSubmission[]
  setSubmissions: Dispatch<SetStateAction<ProblemSubmission[]>>
}

const Problem = ({ problem, viewOnly, submissions, setSubmissions }: Props) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography>
        <b>Question {problem.num}</b>
      </Typography>
      <Typography sx={{ mb: 3 }}>{problem.question}</Typography>
      {/* {problem.img && (
        <div style={styles.center}>
          <img style={styles.img} src={problem.img} />
        </div>
      )} */}
      {problem.multi ? (
        <MultipleChoice
          problem={problem}
          viewOnly={viewOnly}
          submissions={submissions}
          setSubmissions={setSubmissions}
        />
      ) : (
        <InputAnswer
          problem={problem}
          viewOnly={viewOnly}
          submissions={submissions}
          setSubmissions={setSubmissions}
        />
      )}
    </Box>
  )
}

const MultipleChoice = ({
  problem,
  viewOnly,
  submissions,
  setSubmissions,
}: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  useEffect(() => {
    setShuffledOptions(_.shuffle(problem.options))
  }, [problem.options])

  const existingSubmission = submissions.find(
    (submission) => submission.problemId === problem.id
  )

  const selectOption = (option: string) => {
    // If the user has already selected an option, update it
    if (existingSubmission) {
      const replaceSubmission = submissions.map((submission) =>
        submission.problemId === problem.id
          ? { ...submission, selected: option }
          : submission
      )
      setSubmissions(replaceSubmission)
      return
    }

    // Or add a new entry
    setSubmissions([
      ...submissions,
      {
        problemId: problem.id,
        selected: option,
      },
    ])
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {shuffledOptions.map((option: any) => {
        const selected = existingSubmission?.selected === option
        return (
          <Paper
            key={option}
            sx={{
              py: 1.5,
              px: 6,
              mr: 2,
              backgroundColor: selected ? "primary.light" : null,
              textColor: "white",
              cursor: "pointer",
            }}
            onClick={viewOnly ? null : () => selectOption(option)}
          >
            <Typography mb={0}>{option}</Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

const InputAnswer = ({
  problem,
  viewOnly,
  submissions,
  setSubmissions,
}: Props) => {
  const existingSubmission = submissions.find(
    (submission) => submission.problemId === problem.id
  )

  const selectOption = (option: string) => {
    // If the user has already selected an option, update it
    if (existingSubmission) {
      const replaceSubmission = submissions.map((submission) =>
        submission.problemId === problem.id
          ? { ...submission, selected: option }
          : submission
      )
      setSubmissions(replaceSubmission)
      return
    }

    // Or add a new entry
    setSubmissions([
      ...submissions,
      {
        problemId: problem.id,
        selected: option,
      },
    ])
  }

  return (
    <>
      {!viewOnly && (
        <>
          <TextField
            type="number"
            onChange={(event: any) => selectOption(event.target.value)}
            defaultValue={problem.selected}
            l // Prevents scroll changing the input
            onWheelCapture={(e: any) => {
              e.target.blur()
            }}
          />
          {problem.unit && (
            <Typography display="inline">{problem.unit}</Typography>
          )}
        </>
      )}
    </>
  )
}

const Page = () => {
  const { data, escape, component } = useAuthQuery(
    "examSession",
    findActiveExam
  )

  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([])

  if (escape) return component

  const { exam, examSession } = data as {
    exam: ExamWithProblems
    examSession: ExamSession
  }

  console.log(submissions)

  const formatTime = (date: Date | Dayjs) => dayjs(date).format("hh:mma")
  const { start } = examSession
  const end = dayjs(start).add(45, "minute")

  return (
    <Container sx={{ pt: 3 }}>
      <Typography>You have 45 minutes to complete this test</Typography>
      <Typography>Start: {formatTime(start)}</Typography>
      <Typography>End: {formatTime(end)}</Typography>
      <Divider sx={{ mb: 4 }} />

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
      <Button>Submit</Button>
    </Container>
  )
}

export default Page
