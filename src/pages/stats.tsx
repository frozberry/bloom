import { Container, Typography } from "@mui/material"
import axios from "axios"
import Radar from "../components/graphs/Radar"
import NoExamsTaken from "../components/NoExamsTaken"
import PercentileRating from "../components/PercentileRating"
import useAuthQuery from "../hooks/useAuthQuery"
import displayCategory from "../lib/displayCategory"
import { CategoryStatsData, RadarData } from "../lib/types"
import { getCategoriesStats } from "../services/client/gradedCategoryClient"

const getUserScore = async () => {
  const res = await axios.get<{ score: number | null }>("/api/score")
  return res.data
}

const Stats = () => {
  // TODO make a hook for multiple queries
  const { data, escape, component } = useAuthQuery(
    "categoryStats",
    getCategoriesStats
  )
  const { data: data2, escape: escape2 } = useAuthQuery("score", getUserScore)

  if (escape || escape2) return component

  const categoryData = data as CategoryStatsData
  const score = data2.score as number | null

  if (!score) return <NoExamsTaken page="stats" />

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
      <PercentileRating score={score} />
      <Typography sx={{ textAlign: "center", my: 2 }}>
        Only 1 in 10 children who take the 11+ exam get into grammar schools.
      </Typography>
      <Typography sx={{ textAlign: "center", my: 2 }}>
        You should aim for your child to be scoring higher than 90% of other
        students by the time they take their entrace exam.
      </Typography>
      <Typography variant="h2" sx={{ mt: 8 }}>
        Category breakdown
      </Typography>
      <Radar data={radarData} />
    </Container>
  )
}

export default Stats
