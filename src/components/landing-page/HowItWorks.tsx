import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { Box } from "@mui/material"

const HowItWorks = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "beige.main",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          <b>How it works</b>
        </Typography>

        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box sx={{ m: 1, width: { xs: "auto", sm: "33%" } }}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              1
            </Typography>
            <Typography align="center" paragraph sx={{ fontSize: 22 }}>
              Every week your child completes an 11+ maths exam on our website
            </Typography>
          </Box>
          <Box sx={{ m: 1, width: { xs: "auto", sm: "33%" } }}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              2
            </Typography>
            <Typography align="center" paragraph sx={{ fontSize: 22 }}>
              Compare their results to other children competing for grammar
              school spots
            </Typography>
          </Box>
          <Box sx={{ m: 1, width: { xs: "auto", sm: "33%" } }}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }}>
              3
            </Typography>
            <Typography align="center" paragraph sx={{ fontSize: 22 }}>
              Use our data-driven insights to give you the insights to perfect
              your child's preparation
            </Typography>
          </Box>
        </Container>
      </Container>
    </Container>
  )
}

export default HowItWorks
