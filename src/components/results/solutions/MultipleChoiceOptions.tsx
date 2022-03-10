import { Paper, Typography } from "@mui/material"
import { GradedProblem } from "@prisma/client"

type Props = {
  problem: GradedProblem
  option: string
}

enum ColorTypes {
  DEFAULT,
  SELECTED,
  CORRECT,
  INCORRECT,
}

const OptionPaper = ({ option, colorType, clickable }: any) => {
  let backgroundColor = null
  let textColor = null

  switch (colorType) {
    case ColorTypes.DEFAULT:
      break
    case ColorTypes.SELECTED:
      backgroundColor = "primary.light"
      break
    case ColorTypes.CORRECT:
      backgroundColor = "#CBF4C9"
      textColor = "green"
      break
    case ColorTypes.INCORRECT:
      backgroundColor = "#FDE2DD"
      textColor = "red"
      break
  }

  return (
    <Paper
      sx={{
        py: 1.5,
        px: 6,
        mr: 2,
        cursor: clickable ? "pointer" : "default",
        backgroundColor,
      }}
    >
      <Typography sx={{ mb: 0 }} color={textColor}>
        {option}
      </Typography>
    </Paper>
  )
}

const MultipleChoiceOptions = ({ problem, option }: Props) => {
  const correct = problem.correct === option

  if (correct) {
    return (
      <OptionPaper
        option={option}
        colorType={ColorTypes.CORRECT}
        clickable={false}
      />
    )
  }

  if (!(problem.selected === option)) {
    return (
      <OptionPaper
        option={option}
        colorType={ColorTypes.DEFAULT}
        clickable={false}
      />
    )
  }

  return (
    <OptionPaper
      option={option}
      colorType={ColorTypes.INCORRECT}
      clickable={false}
    />
  )
}

export default MultipleChoiceOptions
