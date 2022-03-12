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
    <div style={{ marginBottom: 10 }}>
      You child scored higher than {percentile}% of Waterfront students{" "}
      <PercentileGraph data={data} />
    </div>
  )
}

export default PercentileRating
