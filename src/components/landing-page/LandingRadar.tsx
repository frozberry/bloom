import { LocalGasStation } from "@mui/icons-material"
import { useState } from "react"

import Radar from "../graphs/Radar"
import useInterval from "../../lib/useInterval"

type Foo = {
  data: Bar[]
  its: number
}

type Bar = {
  category: string
  ["Your child"]: number
  Average: number
}

const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const initData: Foo = {
  its: 1,
  data: [
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
  ],
}

const genData = (currentData: Foo): Foo => {
  if (currentData.its > 11) {
    return initData
  }

  const data = currentData.data.map((d) => {
    const currentValue = d["Your child"]
    const maxValue = Math.min(100, currentValue + 20)
    const newValue = rand(currentValue, maxValue)
    return {
      ...d,
      ["Your child"]: newValue,
    }
  })

  return {
    its: currentData.its + 1,
    data,
  }
}

const LandingRadar = () => {
  const [radarData, setRadarData] = useState(initData)

  useInterval(() => {
    setRadarData(() => genData(radarData))
  }, 1000)

  return <Radar data={radarData.data} />
}

export default LandingRadar
