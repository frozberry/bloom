import {
	Box, Paper, Typography
} from "@mui/material"
import { GradedProblem } from "@prisma/client"
import _ from "lodash"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ProblemSubmission } from "../../lib/types"

type Props = {
  problem: GradedProblem
  viewOnly: boolean
  submissions: ProblemSubmission[]
  setSubmissions: Dispatch<SetStateAction<ProblemSubmission[]>>
}

const MultipleChoice = ({
  problem,
  viewOnly,
  submissions,
  setSubmissions,
}: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  console.log(submissions)

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
      localStorage.setItem("submissions", JSON.stringify(replaceSubmission))
      setSubmissions(replaceSubmission)
      return
    }

    const addSubmission = [
      ...submissions,
      {
        problemId: problem.id,
        selected: option,
      },
    ]
    localStorage.setItem("submissions", JSON.stringify(addSubmission))
    setSubmissions(addSubmission)
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

export default MultipleChoice
