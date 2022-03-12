const MEAN = 70
const STD_DEV = 10

const normalY = (x: number, mean: number, stdDev: number) =>
  Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))

const createNormalDistribution = () => {
  const normalDistribution = []

  for (let i = 0; i < 100; i++) {
    const noise = (Math.random() - 0.5) / 50

    const y = Math.min((normalY(i, MEAN, STD_DEV) + noise) * 100, 100)

    normalDistribution.push({
      x: i,
      y,
    })
  }

  return normalDistribution
}

export default createNormalDistribution
