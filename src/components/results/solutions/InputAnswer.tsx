import { Typography } from "@mui/material"
import { GradedProblem } from "@prisma/client"
type Props = {
  problem: GradedProblem
  correct: boolean
}

const InputAnswer = ({ problem, correct }: Props) => {
  return (
    <>
      <Typography>
        {problem.selected && (
          <>
            You answered: <b>{problem.selected}</b> {problem.unit}
          </>
        )}
      </Typography>
      {!correct && (
        <Typography>
          The correct answer was: <b>{problem.correct}</b> {problem.unit}
        </Typography>
      )}
    </>
  )
}

export default InputAnswer
