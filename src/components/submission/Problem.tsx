import { Box, Typography } from "@mui/material"
import { GradedProblem, Problem } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { ProblemSubmission } from "../../lib/types"
import InputAnswer from "./InputSubmission"
import MultipleChoice from "./MultipleChoice"

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

export default Problem
