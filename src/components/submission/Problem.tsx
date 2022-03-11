import { Box, Typography } from "@mui/material"
import { Problem } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { ProblemSubmission } from "../../lib/types"
import InputAnswer from "./InputSubmission"
import MultipleChoice from "./MultipleChoice"

type Props = {
  problem: Problem
  submissions: ProblemSubmission[]
  setSubmissions: Dispatch<SetStateAction<ProblemSubmission[]>>
}

const Problem = ({ problem, submissions, setSubmissions }: Props) => {
  const existingSubmission = submissions.find(
    (submission) => submission.problemId === problem.id
  )

  const addOrReplaceSubmission = (option: string) => {
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
    <Box sx={{ mb: 5 }}>
      <Typography>
        <b>Question {problem.num}</b>
      </Typography>
      <Typography sx={{ mb: 3 }}>{problem.question}</Typography>
      {problem.img && (
        <Box sx={{ my: 3, maxWidth: "100%" }}>
          <img
            src={problem.img}
            alt="problem image"
            style={{ maxWidth: "100%" }}
          />
        </Box>
      )}
      {problem.multi ? (
        <MultipleChoice
          problem={problem}
          existingSubmission={existingSubmission}
          addOrReplaceSubmission={addOrReplaceSubmission}
        />
      ) : (
        <InputAnswer
          problem={problem}
          existingSubmission={existingSubmission}
          addOrReplaceSubmission={addOrReplaceSubmission}
        />
      )}
    </Box>
  )
}

export default Problem
