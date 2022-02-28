import { Paper, Typography } from "@mui/material"

const MultipleChoiceOptions = ({ problem, option }) => {
  const correct = problem.correct === option

  if (problem.multi) {
    console.log(problem)
  }

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
