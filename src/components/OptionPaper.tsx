import { Paper, Typography } from "@mui/material"

export enum ColorTypes {
  DEFAULT,
  SELECTED,
  CORRECT,
  INCORRECT,
}

type Props = {
  option: string
  colorType: ColorTypes
  clickable: boolean
}

const OptionPaper = ({ option, colorType, clickable }: Props) => {
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

export default OptionPaper
