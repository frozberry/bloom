import { Typography, Divider, Box } from "@mui/material"
import Link from "next/link"
import _ from "lodash"

// TODO Check this displays correctly when I have multiple attempts
const MultipleAttempts = ({ test }: any) => {
  const firstName = "henry"
  const attempts = test.attempts.length
  // TODO remove any
  const averagePercent = Math.round(
    _.meanBy(test.attempts, (a: any) => a.percent)
  )
  const averageMarks = Math.round(_.meanBy(test.attempts, (a: any) => a.marks))
  const totalMarks = test.attempts[0].total
  return (
    <Link href={`/results/exam/${test.testId}`} passHref>
      <Box sx={{ cursor: "pointer" }}>
        <Typography variant="h4">Maths Test {test.attempts[0].num}</Typography>
        <Typography>
          {firstName} has attempted this test {attempts} times
        </Typography>
        <Typography>{averagePercent}%</Typography>
        <Typography>
          {averageMarks}/{totalMarks} marks
        </Typography>
        <Divider />
      </Box>
    </Link>
  )
}
export default MultipleAttempts