import { TextField, Typography } from "@mui/material"
import { GradedProblem } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { ProblemSubmission } from "../../lib/types"

type Props = {
  problem: GradedProblem
  viewOnly: boolean
  submissions: ProblemSubmission[]
  setSubmissions: Dispatch<SetStateAction<ProblemSubmission[]>>
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
      localStorage.setItem("submissions", JSON.stringify(replaceSubmission))
      setSubmissions(replaceSubmission)
      return
    }

    // Or add a new entry
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
    <>
      {!viewOnly && (
        <>
          <TextField
            type="number"
            onChange={(event: any) => selectOption(event.target.value)}
            defaultValue={existingSubmission?.selected}
            // Prevents scroll changing the input
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

export default InputAnswer
