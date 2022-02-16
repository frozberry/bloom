import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import LandingRadar from "./LandingRadar"
import LandingLineProgress from "./LandingLineProgress"

const styles = {
  section: {
    marginTop: 80,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    color: "#121D1E",
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 50,
    fontSize: 22,
  },
}

const LandingGraphs = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 7 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", mb: 4, color: "#121D1E" }}
        >
          <b>Track your child's progress over time</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          Experts recommend starting 11+ preparation in Year 3 - Waterfront lets
          you easily visualise your child's progress
        </Typography>
        <LandingLineProgress />
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", mb: 4, color: "#121D1E" }}
        >
          <b>Detailed breakdown of your child's strength and weaknesses</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          Our insights reveal areas that require work to help you perfect the
          study plan for your child
        </Typography>
        <LandingRadar />
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", mb: 4, color: "#121D1E" }}
        >
          <b>See how your child ranks against the competition</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          For every 10 children who take the 11+ exam, only one child gets a
          grammar school spot.
        </Typography>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", mb: 4, color: "#121D1E" }}
        >
          <b>One new expertly written maths test every week</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          Develop your child's mathematical problem solving skills - expertly
          tailored for real 11+ exams
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <img src="https://i.imgur.com/Fn56Ft1.png" style={{ width: 800 }} />
        </div>
      </Box>
    </Container>
  )
}

export default LandingGraphs
