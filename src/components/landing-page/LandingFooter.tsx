import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Link from "next/link"

const LandingFooter = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "lightBlue.main",
        py: {
          xs: 1,
          sm: 4,
        },
      }}
    >
      <Container>
        <Typography sx={{ textAlign: "center", my: 5 }} variant="h3">
          <b>Start your child's journey to a top grammar school today</b>
        </Typography>

        <Link href="/signup" passHref>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 5,
              py: {
                xs: 2,
                sm: 3,
              },
              fontSize: {
                xs: 16,
                sm: 20,
              },
              textTransform: "none",
            }}
          >
            Start preparing for the 11+ exam
          </Button>
        </Link>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: 16,
              sm: 20,
            },
          }}
        >
          Get started today with zero risk
        </Typography>
      </Container>
    </Container>
  )
}

export default LandingFooter
