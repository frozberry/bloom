import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import PercentileGraph from "../graphs/PercentileGraph"
import LandingLineProgress from "./LandingLineProgress"
import LandingRadar from "./LandingRadar"

const LandingGraphs = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 7 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
          <b>Track your child's progress over time</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          Experts recommend starting 11+ preparation in Year 3 - Bloom lets you
          easily visualise your child's progress
        </Typography>
        <LandingLineProgress />
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
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
        <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
          <b>See how your child ranks against the competition</b>
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ textAlign: "center", mb: 6, fontSize: 22 }}
        >
          For every 10 children who take the 11+ exam, only one child gets a
          grammar school spot.
        </Typography>

        <PercentileGraph score={92} />
      </Box>

      <Box sx={{ mt: 7 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
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
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Image
              src="/questions.png"
              alt="Expertly written 11+ maths examination questions"
              layout="responsive"
              width={1080}
              height={570}
            />
          </Box>
        </div>
      </Box>
    </Container>
  )
}

export default LandingGraphs
