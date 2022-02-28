import { Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import Loading from "../../components/Loading"
import { getNextExam } from "../../services/client/examsClient"
import { UserContext } from "../_app"

const Home = () => {
  const { isLoading, error, data } = useQuery("nextExam", getNextExam)
  const router = useRouter()
  const user = useContext(UserContext)
  const nextExam = data

  if (!user) return "No user"
  if (isLoading) return <Loading />
  if (error) return "Error"

  const startTest = () => {
    if (
      window.confirm(
        "The test will take 45m and you will not be able to pause or restart the test. Are you ready to begin?"
      )
    ) {
      router.push(`/exams/${nextExam.id}`)
    }
  }

  // TODO get the users name
  const profile = {
    firstName: "henry",
  }

  return (
    <Container>
      {/* TODO needs a better way to handle no more exams as */}
      {nextExam === "" ? (
        <>
          <Typography>The next test will be released a week.</Typography>
          <Typography>
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