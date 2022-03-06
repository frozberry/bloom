import { Paper, Typography } from "@mui/material"
import { GradedProblem } from "@prisma/client"

type Props = {
  problem: GradedProblem
  option: string
}

const MultipleChoiceOptions = ({ problem, option }: Props) => {
  const correct = problem.correct === option

  if (correct) {
    return (
      <Paper
        key={option}
        sx={{
          py: 1.5,
          px: 6,
          mr: 2,
          //TODO Use theme color
          backgroundColor: "#CBF4C9",
        }}
      >
        <Typography color={correct ? "green" : "red"} sx={{ mb: 0 }}>
          <b>{option}</b>
        </Typography>
      </Paper>
    )
  }

  if (!(problem.selected === option)) {
    return (
      <Paper key={option} sx={{ py: 1.5, px: 6, mr: 2 }}>
        <Typography sx={{ mb: 0 }}>{option}</Typography>
      </Paper>
    )
  }

  return (
    <Paper
      key={option}
      sx={{
        py: 1.5,
        px: 6,
        mr: 2,
        // TODO Use theme color
        backgroundColor: "#FDE2DD",
      }}
    >
      <Typography color={correct ? "green" : "red"} sx={{ mb: 0 }}>
        {option}
      </Typography>
    </Paper>
  )
}

export default MultipleChoiceOptions
