import { Paper, Typography } from "@mui/material"

export type ColorType = "default" | "selected" | "correct" | "incorrect"

type Props = {
  option: string
  colorType: ColorType
  onClick?: () => void
}

const OptionPaper = ({ option, colorType, onClick }: Props) => {
  let backgroundColor = null
  let textColor = null

  switch (colorType) {
    case "default":
      break
    case "selected":
      backgroundColor = "primary.light"
      break
    case "selected":
      backgroundColor = "#CBF4C9"
      textColor = "green"
      break
    case "incorrect":
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
      <Typography sx={{ mb: 0, textAlign: "center", color: textColor }}>
        {option}
      </Typography>
    </Paper>
  )
}

export default OptionPaper
