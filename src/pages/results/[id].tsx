import { Button, Container, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import Loading from "../../components/Loading"
import { findGradedExamById } from "../../services/client/gradedExamClient"
import { UserContext } from "../_app"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { isLoading, error, data } = useQuery(id, () => findGradedExamById(id))
  const user = useContext(UserContext)

  const gt = data

  if (!user) return "No user"
  if (isLoading) return <Loading />
  if (error) return "Error"

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Paper
        sx={{
          px: 10,
          py: 4,
        }}
      >
        <Typography align="center" variant="h6">
          You scored
        </Typography>
        <Typography align="center" variant="h3">
          {gt.percent}%
        </Typography>
        <Typography align="center">
          {`${gt.marks}/${gt.total}`} marks
        </Typography>
        <Link href={`/exams/${id}`} passHref>
          <Button variant="contained" sx={{ mt: 2 }}>
            Retry test
          </Button>
        </Link>
      </Paper>
      {/* <Answers gradedProblems={gt.gradedProblems} /> */}
    </Container>
  )
}

export default Page
