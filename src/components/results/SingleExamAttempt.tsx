import { Typography, Divider, Box } from "@mui/material"
import Link from "next/link"
import dayjs from "dayjs"
import { GradedExamWithExam } from "../../lib/types"

type Props = {
  gradedExam: GradedExamWithExam
}

const SingleAttempt = ({ gradedExam }: Props) => {
  return (
    <Link href={`/results/graded-exams/${gradedExam.id}`} passHref>
      <Box sx={{ cursor: "pointer", py: 2 }}>
        <Typography variant="h4" gutterBottom>
          Maths Test {gradedExam?.exam?.num}
        </Typography>
        <Typography gutterBottom>
          {dayjs(gradedExam.createdAt).format("D MMM h:mma")}
        </Typography>
        <Typography gutterBottom>{Math.round(gradedExam.percent)}%</Typography>
        <Typography gutterBottom>
          {gradedExam.marks}/{gradedExam.totalMarks} marks
        </Typography>
        <Divider sx={{ mt: 3 }} />
      </Box>
    </Link>
  )
}

export default SingleAttempt
