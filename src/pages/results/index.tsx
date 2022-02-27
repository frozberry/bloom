import { Container, Typography, Divider } from "@mui/material"
import Link from "next/link"
import { useQuery } from "react-query"
import dayjs from "dayjs"
import axios from "axios"

const styles = {
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
}

const ResultsList = () => {
  const { isLoading, error, data } = useQuery("gradedTestsData", () =>
    axios.get("/api/graded-exams/all").then((res) => res.data)
  )

  if (isLoading) return "Loading query..."

  console.log(data)

  return (
    <Container>
      {data.map((gradedTest: any) => (
        <SingleAttempt key={gradedTest.id} gt={gradedTest} />
      ))}
    </Container>
  )
}

const SingleAttempt = ({ gt }: any) => {
  return (
    <Link href={`/results/${gt.id}`} passHref>
      <div>
        <Typography variant="h4">Maths Test {gt.num}</Typography>
        <Typography>{dayjs(gt.date).format("D MMM h:mma")}</Typography>
        <Typography>{gt.percent}%</Typography>
        <Typography>
          {gt.marks}/{gt.total} marks
        </Typography>
        <Divider style={styles.divider} />
      </div>
    </Link>
  )
}

// const MultipleAttempts = ({ test }) => {
//   const profile = useSelector((state) => state.profile)
//   const attempts = test.attempts.length
//   const averagePercent = Math.round(_.meanBy(test.attempts, (a) => a.percent))
//   const averageMarks = Math.round(_.meanBy(test.attempts, (a) => a.marks))
//   const totalMarks = test.attempts[0].total
//   return (
//     <Link
//       href={`/results/test/${test.testId}`}
//       style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
//     >
//       <Typography variant="h4">Maths Test {test.attempts[0].num}</Typography>
//       <Typography>
//         {profile?.firstName} has attempted this test {attempts} times
//       </Typography>
//       <Typography>{averagePercent}%</Typography>
//       <Typography>
//         {averageMarks}/{totalMarks} marks
//       </Typography>
//       <Divider style={styles.divider} />
//     </Link>
//   )
// }

export default ResultsList
