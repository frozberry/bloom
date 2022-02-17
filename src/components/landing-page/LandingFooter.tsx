import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"

const LandingFooter = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "lightBlue.main",
        py: 4,
        px: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography sx={{ textAlign: "center", my: 5 }} variant="h3">
          <b>Start your child's journey to a top grammar school today</b>
        </Typography>
        <Typography
          variant="h5"
          sx={{
            letterSpacing: 1,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Try Waterfront free for 14-days
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          // onClick={() => history.push("/signup")}
          sx={{ mb: 5, py: 3, fontSize: 20, textTransform: "none" }}
        >
          Start preparing for the 11+ exam
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Get started today with zero risk
        </Typography>
      </Container>
    </Container>
  )
}

export default LandingFooter
