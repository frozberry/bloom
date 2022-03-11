import { Button, Container, Typography } from "@mui/material"
import { Exam } from "@prisma/client"
import { useRouter } from "next/router"
import useAuthQuery from "../hooks/useAuthQuery"
import { getNextExam } from "../services/client/examClient"
import {
  createExamSession,
  findActiveExam,
} from "../services/client/examSessionClient"

const Home = () => {
  const router = useRouter()
  // TODO maybe a better way to do multiple queries
  const { data, escape, component } = useAuthQuery("nextExam", getNextExam)
  const {
    data: session,
    escape: escapeSession,
    component: sessionComponent,
  } = useAuthQuery("examSession", findActiveExam)

  if (escapeSession) return sessionComponent
  if (escape) return component

  if (session) {
    router.push("/session")
  }

  const nextExam = data as Exam

  const startTest = async () => {
    if (
      window.confirm(
        "The test will take 45m and you will not be able to pause once you begin. Are you ready to start the test?"
      )
    ) {
      await createExamSession(nextExam.id)
      router.push("/session")
    }
  }

  // TODO get the users name
  const profile = {
    firstName: "your child",
  }

  return (
    <Container sx={{ mt: 3 }}>
      {/* TODO needs a better way to handle no more exams as */}
      {!nextExam ? (
        <>
          <Typography paragraph>
            The next test will be released a week.
          </Typography>
          <Typography paragraph>
            We will send you an email when you it's avaiable
          </Typography>
        </>
      ) : (
        <>
          <Typography paragraph>You have a new test ready.</Typography>
          <Typography paragraph>
            Please make sure {profile.firstName} has 45 minutes avaiable to take
            the test.
          </Typography>
          <Typography paragraph>
            Once you begin, you will not be able to pause or restart the test.
          </Typography>
          <Typography paragraph>
            You will only need a pen/pencil and paper. Calculators are not
            allowed.
          </Typography>
          <Button variant="contained" onClick={startTest}>
            Begin Test
          </Button>
        </>
      )}
    </Container>
  )
}

export default Home
