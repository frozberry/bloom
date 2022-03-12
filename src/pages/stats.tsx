import { Container, Typography } from "@mui/material"
import Radar from "../components/graphs/Radar"
import PercentileRating from "../components/PercentileRating"
import useAuthQuery from "../hooks/useAuthQuery"
import displayCategory from "../lib/displayCategory"
import { CategoryStatsData, RadarData } from "../lib/types"
import { getCategoriesStats } from "../services/client/gradedCategoryClient"

const Stats = () => {
  const { data, escape, component } = useAuthQuery(
    "categoryStats",
    getCategoriesStats
  )
  if (escape) return component

  const categoryData = data as CategoryStatsData
  const radarData: RadarData[] = categoryData.map((category) => {
    const score = (100 * category.correct) / category.attempts
    return {
      category: displayCategory(category.category),
      ["Your child"]: Math.round(score),
      Average: Math.round(category.average),
    }
  })

  const name = "your child"

  return (
    <Container sx={{ mt: 3 }}>
      <Radar data={radarData} />
      <Container maxWidth="md">
        <Typography variant="h4" style={{ textAlign: "center" }}>
          We are currently processing {name}'s results.
        </Typography>
      </Container>
      <Container maxWidth="sm" style={{ marginTop: 20, marginBottom: 20 }}>
        <Typography>
          Waterfront will compare {name}'s results with other students on the
          platform. We still need a bit more time to gather the data and give
          you an accurate result. But we'll let you know when it's ready.
        </Typography>
      </Container>
      <PercentileRating score={89} />
      <Typography>
        Only 1 in 10 children who take the 11+ exam get into grammar schools.
        You should aim to be in the blue section - the top 90%
      </Typography>
    </Container>
  )
}

export default Stats
