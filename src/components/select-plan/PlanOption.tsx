import { Button, Paper, Typography } from "@mui/material"

const PlanOption = ({
  title,
  price,
  onClick,
}: {
  title: string
  price: string
  onClick: () => void
}) => {
  return (
    <Paper
      sx={{
        my: { xs: 2, sm: 4 },
        mx: { xs: 0, sm: 2 },
        py: { xs: 3, sm: 4 },
        width: 280,
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: {
            xs: 1,
            sm: 3,
          },
        }}
      >
        {title}
      </Typography>
      <Typography paragraph>{price}</Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        sx={{ mt: { xs: 0, sm: 1 } }}
        onClick={onClick}
      >
        Choose plan
      </Button>
    </Paper>
  )
}

export default PlanOption
