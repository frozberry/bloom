import { Typography, Divider, Box } from "@mui/material"
import Link from "next/link"
import dayjs from "dayjs"

const SingleAttempt = ({ gradedTest }: any) => {
  return (
    <Link href={`/results/${gradedTest.id}`} passHref>
      <Box sx={{ cursor: "pointer" }}>
        <Typography variant="h4">Maths Test {gradedTest.num}</Typography>
        <Typography>{dayjs(gradedTest.date).format("D MMM h:mma")}</Typography>
        <Typography>{gradedTest.percent}%</Typography>
        <Typography>
          {gradedTest.marks}/{gradedTest.total} marks
        </Typography>
        <Divider />
      </Box>
    </Link>
  )
}

export default SingleAttempt
