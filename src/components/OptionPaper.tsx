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
  onClick?: () => void
}

const OptionPaper = ({ option, colorType, onClick }: Props) => {
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
        px: {
          xs: 2,
          sm: 6,
        },
        mr: {
          xs: 1,
          sm: 2,
        },
        mb: {
          xs: 2,
          sm: "default",
        },
        width: {
          xs: "100%",
          sm: "auto",
        },
        cursor: onClick ? "pointer" : "default",
        backgroundColor,
      }}
      onClick={onClick}
    >
      <Typography sx={{ mb: 0, textAlign: "center" }} color={textColor}>
        {option}
      </Typography>
    </Paper>
  )
}

export default OptionPaper
