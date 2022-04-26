import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import VideoPlayer from "../VideoPlayer"

const WhatsBloom = () => {
  return (
    // <Container maxWidth="md" style={{ paddingTop: 40, paddingBottom: 40 }}>
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        <b>What&apos;s Bloom?</b>
      </Typography>

      <VideoPlayer />
      <Typography
        variant="body1"
        align="center"
        sx={{ lineHeight: 2, fontSize: 20, mt: 4 }}
      >
        Bloom is the best tool for parents and children in the UK preparing for
        11+ exams. Every week your child takes an expertly written maths mock
        test on our website. We analyse their progress and track how they rank
        against the rest of the country.
      </Typography>
    </Container>
  )
}

export default WhatsBloom
