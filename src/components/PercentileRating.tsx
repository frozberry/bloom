import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import PercentileGraph from "../components/graphs/PercentileGraph"
import createNormalDistribution from "../lib/createNormalDistribution"

type Props = {
  score: number
}

type LineData = {
  id: string
  data: PointData[]
}

type PointData = {
  x: number
  y: number
}

const PercentileRating = ({ score }: Props) => {
  const normalDistribution = createNormalDistribution()

  const data: LineData[] = [
    {
      id: "Waterfront students",
      data: normalDistribution,
    },
    {
      id: "Your child",
      data: [
        {
          x: score,
          y: 0,
        },
        {
          x: score,
          y: 100,
        },
      ],
    },
  ]

  const totalStudents = normalDistribution.reduce((acc, d) => acc + d.y, 0)
  const betterThan = normalDistribution
    .filter((d) => score > d.x)
    .reduce((acc, d) => acc + d.y, 0)
  const percentile = Math.round((betterThan / totalStudents) * 100 * 10) / 10

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h2" sx={{ textAlign: "center", my: 2 }}>
        You child scored higher than {percentile}% of Waterfront students.
      </Typography>

      <Typography sx={{ textAlign: "center", my: 2 }}>
        You child has an average score of <b>{Math.round(score)}%</b> across his
        Waterfront tests.
      </Typography>

      <Typography sx={{ textAlign: "center", my: 2 }}>
        Please note that only the first attempt at each test is counted to their
        official score.
      </Typography>
      <Typography sx={{ textAlign: "center", my: 2 }}>
        A new test is released every week.
      </Typography>

      <PercentileGraph data={data} />
    </Box>
  )
}

export default PercentileRating
