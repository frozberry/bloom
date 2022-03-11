import { Container, Typography } from "@mui/material"

const Bullets = () => {
  return (
    <Container maxWidth="xs">
      <Typography
        paragraph
        color="textPrimary"
        sx={{ fontSize: 20, fontWeight: "bold" }}
      >
        Included with your subscription:
      </Typography>
      <Typography mb={1}>✔️ One new 11+ maths mock every week</Typography>
      <Typography mb={1}>
        ✔️Compare your child's results to other 11+ students
      </Typography>
      <Typography mb={1}>✔️Detailed result analytics</Typography>
      <Typography mb={1}>✔️ Retry tests an unlimited amount</Typography>
      <Typography mb={1}>✔️ Track your child's progress</Typography>
      <Typography mb={1}>
        ✔️ Rewards and certificates for top students
      </Typography>
      <Typography mb={3}>
        ✔️ ️Easy to use online test-taking platform
      </Typography>
      <Typography
        color="textPrimary"
        paragraph
        sx={{ fontSize: 20, fontWeight: "bold" }}
      >
        Coming soon:
      </Typography>
      <Typography mb={1}>⏳ Daily practice problems</Typography>
      <Typography mb={1}>
        ⏳ AI problems tailored for your child's weaknesses
      </Typography>
      <Typography mb={1}>⏳ Ranking and level up system</Typography>
    </Container>
  )
}

export default Bullets
