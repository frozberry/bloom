import { Typography } from "@mui/material"

const InputAnswer = ({ problem, correct }: any) => {
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
