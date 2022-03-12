import { Typography, Container, Box } from "@mui/material"
import Link from "next/link"

type Props = {
  page: "results" | "stats"
}

const NoExamsTaken = ({ page }: Props) => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h2">
        Your child's {page} will show up here after they take their first test
      </Typography>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Link href="/home" passHref>
          <a>Back to home</a>
        </Link>
      </Box>
    </Container>
  )
}

export default NoExamsTaken
