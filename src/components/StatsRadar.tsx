import { Typography, Container } from "@mui/material"
import { RadarData } from "../lib/types"
import Radar from "./graphs/Radar"

const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const StatsRadar = () => {
  const data: RadarData[] = [
    {
      category: "fractions",
      ["Your child"]: rand(5, 15),
      Average: 60,
    },
    {
      category: "algebra",
      ["Your child"]: rand(5, 15),
      Average: 65,
    },
    {
      category: "numbers",
      ["Your child"]: rand(5, 15),
      Average: 80,
    },
    {
      category: "statistics",
      ["Your child"]: rand(5, 15),
      Average: 74,
    },
    {
      category: "multiplication and division",
      ["Your child"]: rand(5, 15),
      Average: 69,
    },
    {
      category: "addition and subtraction",
      ["Your child"]: rand(5, 15),
      Average: 85,
    },
    {
      category: "measurement",
      ["Your child"]: rand(5, 15),
      Average: 89,
    },
    {
      category: "ratio and proportion",
      ["Your child"]: rand(5, 15),
      Average: 75,
    },
    {
      category: "geometry",
      ["Your child"]: rand(5, 15),
      Average: 62,
    },
  ]

  return (
    <Container>
      <Radar data={data} />
    </Container>
  )
}

export default StatsRadar
