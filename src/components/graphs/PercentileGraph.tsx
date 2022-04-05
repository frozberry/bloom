import { ResponsiveLine } from "@nivo/line"
import createNormalDistribution from "../../lib/createNormalDistribution"

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

const PercentileGraph = ({ score }: Props) => {
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

  return (
    <div style={{ height: 400, fontFamily: "Roboto", marginTop: 20 }}>
      <ResponsiveLine
        colors={{ scheme: "accent" }}
        data={data}
        enablePoints={false}
        enableArea={true}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{
          type: "linear",
          min: 0,
          max: 100,
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Waterfront results",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: -30,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
          },
        ]}
      />
    </div>
  )
}

export default PercentileGraph
