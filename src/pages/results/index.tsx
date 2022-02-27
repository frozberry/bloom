import { useEffect, useState } from "react"
import { Container, Typography, Divider } from "@mui/material"
import Link from "next/link"
import { useQuery } from "react-query"
import dayjs from "dayjs"
import _ from "lodash"
import { getSortedTests } from "../../services/client/gradedExamClient"
import { StoredUser } from "../../lib/types"

const styles = {
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
}

const ResultsList = () => {
  const [user, setUser] = useState<StoredUser>()

  useEffect(() => {
    const loggedUserJson = localStorage.getItem("loggedWaterfrontUser")
    if (loggedUserJson) {
      const u = JSON.parse(loggedUserJson)
      setUser(u)
    }
  }, [])

  const { isLoading, error, data } = useQuery(
    "gradedTestsData",
    // axios.get("/api/graded-exams/all").then((res) => res.data)
    () =>
      getSortedTests(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmYTVhMzhiLWU4ZmMtNDFhNy05NWQwLTA0ZjQzOGVjM2ZmMyIsImVtYWlsIjoicGFubmljb3BlQGdtYWlsLmNvbSIsImlhdCI6MTY0NTk5MzM2OX0.ehn90_RY-ryCEB--FRYkTXooRZI3D8a66ShjA_qlGoE"
      )
  )

  console.log(data)

  if (isLoading) return "Loading query..."

  if (!user) {
    return null
  }

  console.log(data)

  return (
    <Container>
      <div>{user.email}</div>

      {data.map((test: any) => {
        const multipleAttempts = test.attempts.length > 1

        if (multipleAttempts) {
          return <MultipleAttempts test={test} key={test.id} />
        }

        return <SingleAttempt gradedTest={test.attempts[0]} key={test.id} />
      })}
    </Container>
  )
}
const SingleAttempt = ({ gradedTest }: any) => {
  return (
    <Link href={`/results/${gradedTest.id}`} passHref>
      <div>
        <Typography variant="h4">Maths Test {gradedTest.num}</Typography>
        <Typography>{dayjs(gradedTest.date).format("D MMM h:mma")}</Typography>
        <Typography>{gradedTest.percent}%</Typography>
        <Typography>
          {gradedTest.marks}/{gradedTest.total} marks
        </Typography>
        <Divider style={styles.divider} />
      </div>
    </Link>
  )
}

// TODO Check this displays correctly when I have multiple attempts
const MultipleAttempts = ({ test }: any) => {
  const firstName = "henry"
  const attempts = test.attempts.length
  const averagePercent = Math.round(_.meanBy(test.attempts, (a) => a.percent))
  const averageMarks = Math.round(_.meanBy(test.attempts, (a) => a.marks))
  const totalMarks = test.attempts[0].total
  return (
    <Link href={`/results/exam/${test.testId}`} passHref>
      <div>
        <Typography variant="h4">Maths Test {test.attempts[0].num}</Typography>
        <Typography>
          {firstName} has attempted this test {attempts} times
        </Typography>
        <Typography>{averagePercent}%</Typography>
        <Typography>
          {averageMarks}/{totalMarks} marks
        </Typography>
        <Divider style={styles.divider} />
      </div>
    </Link>
  )
}

export default ResultsList
