import { Typography, Divider, Box } from "@mui/material"
import Link from "next/link"
import dayjs from "dayjs"
import { GradedExamWithExam } from "../../lib/types"

type Props = {
  gradedExam: GradedExamWithExam
}

const SingleAttempt = ({ gradedExam }: Props) => {
  return (
    <Link href={`/results/${gradedExam.id}`} passHref>
      <Box sx={{ cursor: "pointer" }}>
        <Typography variant="h4">Maths Test {gradedExam.exam.num}</Typography>
        <Typography>
          {dayjs(gradedExam.createdAt).format("D MMM h:mma")}
        </Typography>
        <Typography>{Math.round(gradedExam.percent)}%</Typography>
        <Typography>
          {gradedExam.marks}/{gradedExam.totalMarks} marks
        </Typography>
        <Divider />
      </Box>
    </Link>
  )
}

export default SingleAttempt
