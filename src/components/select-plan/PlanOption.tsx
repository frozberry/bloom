import { Button, CircularProgress, Paper, Typography } from "@mui/material"

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
        marginTop: 4,
        py: 4,
        width: 280,
        textAlign: "center",
        mx: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: 3,
        }}
      >
        {title}
      </Typography>
      <Typography>{price}</Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        sx={{ mt: 2 }}
        onClick={onClick}
        startIcon={<CircularProgress color="secondary" size="small" />}
      >
        Choose plan
      </Button>
    </Paper>
  )
}

export default PlanOption
