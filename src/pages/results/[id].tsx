import { Button, Container, Paper, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import Loading from "../../components/Loading"
import { findGradedExamById } from "../../services/client/gradedExamClient"
import { UserContext } from "../_app"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  paper: {
    paddingRight: 90,
    paddingLeft: 90,
    paddingTop: 20,
    paddingBottom: 20,
  },
  centerText: {
    textAlign: "center",
  },
  retry: {
    marginTop: 10,
  },
}

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
    <Container style={styles.root}>
      <Paper style={styles.paper}>
        <Typography style={styles.centerText} variant="h6">
          You scored
        </Typography>
        <Typography style={styles.centerText} variant="h3">
          {gt.percent}%
        </Typography>
        <Typography style={{ textAlign: "center" }}>
          {`${gt.marks}/${gt.total}`} marks
        </Typography>
        <Button
          variant="contained"
          // onClick={() => history.push(`/tests/${gt.testId}`)}
          style={styles.retry}
        >
          Retry test
        </Button>
      </Paper>
      {/* <Answers gradedProblems={gt.gradedProblems} /> */}
    </Container>
  )
}

export default Page
