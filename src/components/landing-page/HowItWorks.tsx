import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

const HowItWorks = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#FFEEE2",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ mb: 20 }}>
          <b>How it works</b>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              1
            </Typography>
            <Typography
              align="center"
              paragraph
              sx={{ fontSize: 22, color: "#121D1E" }}
            >
              Every week your child completes an 11+ maths exam on our website
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              2
            </Typography>
            <Typography
              align="center"
              paragraph
              sx={{ fontSize: 22, color: "#121D1E" }}
            >
              Compare their results to other children competing for grammar
              school spots
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              3
            </Typography>
            <Typography
              align="center"
              paragraph
              sx={{ fontSize: 22, color: "#121D1E" }}
            >
              Use our data-driven insights to give you the insights to perfect
              your child's preparation
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default HowItWorks
