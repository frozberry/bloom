import { Typography, Divider, Box } from "@mui/material"
import Link from "next/link"
import _ from "lodash"
import { Exam, GradedExam } from "@prisma/client"

type Props = {
  exam: Exam & {
    attempts: GradedExam[]
  }
}

// TODO Check this displays correctly when I have multiple attempts
const MultipleAttempts = ({ exam }: Props) => {
  const firstName = "henry"
  const attempts = exam.attempts.length

  const averagePercent = Math.round(_.meanBy(exam.attempts, (a) => a.percent))
  const averageMarks = Math.round(_.meanBy(exam.attempts, (a: any) => a.marks))
  const totalMarks = exam.attempts[0].totalMarks
  return (
    <Link href={`/results/exam/${exam.id}`} passHref>
      <Box sx={{ cursor: "pointer" }}>
        <Typography variant="h4">Maths Test {exam.num}</Typography>
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
