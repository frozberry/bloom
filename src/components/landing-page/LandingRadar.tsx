import { LocalGasStation } from "@mui/icons-material"
import { useState } from "react"

// import Radar from "../stats/Radar"
import useInterval from "../../lib/useInterval"

type Foo = {
  data: Bar[]
  its: number
}

type Bar = {
  category: string
  Oli: number
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
      Oli: rand(5, 15),
      Average: 60,
    },
    {
      category: "algebra",
      Oli: rand(5, 15),
      Average: 65,
    },
    {
      category: "numbers",
      Oli: rand(5, 15),
      Average: 80,
    },
    {
      category: "statistics",
      Oli: rand(5, 15),
      Average: 74,
    },
    {
      category: "multiplication and division",
      Oli: rand(5, 15),
      Average: 69,
    },
    {
      category: "addition and subtraction",
      Oli: rand(5, 15),
      Average: 85,
    },
    {
      category: "measurement",
      Oli: rand(5, 15),
      Average: 89,
    },
    {
      category: "ratio and proportion",
      Oli: rand(5, 15),
      Average: 75,
    },
    {
      category: "geometry",
      Oli: rand(5, 15),
      Average: 62,
    },
  ],
}

const genData = (currentData: Foo): Foo => {
  console.log(currentData)

  if (currentData.its > 11) {
    return initData
  }

  const data = currentData.data.map((d) => {
    const currentValue = d.Oli
    const maxValue = Math.min(100, currentValue + 20)
    const newValue = rand(currentValue, maxValue)
    return {
      ...d,
      Oli: newValue,
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

  return <>{/* <Radar data={radarData.data} /> */}</>
}

export default LandingRadar
