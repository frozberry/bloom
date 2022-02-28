import { Container, Typography } from "@mui/material"

const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join("").toLowerCase()

const Stats = () => {
  // const [gcs, setGcs] = useState(null)
  // const [averageGcs, setAverageGcs] = useState(null)

  // useEffect(() => {
  //   if (user) {
  //     gradedCategoryService
  //       .getGradedCategories(user.token)
  //       .then((gc) => setGcs(gc))

  //     gradedCategoryService.getAverageGcs().then((av) => setAverageGcs(av))
  //   }
  // }, [user])

  // if (!gcs || !averageGcs || !profile) return null

  const calculatePercent = (gc) => Math.round((100 * gc.correct) / gc.attempts)

  // const withAverage = gcs.map((gc) => {
  //   const matchedAverage = averageGcs.filter(
  //     (agc) => agc.name === gc.categoryName
  //   )
  //   const average = matchedAverage[0].average
  //   const roundedAverage = Math.round(average)
  //   return {
  //     ...gc,
  //     average: roundedAverage,
  //   }
  // })

  // const radarData = withAverage.map((gc) => ({
  //   category: gc.categoryName,
  //   [profile.firstName]: calculatePercent(gc),
  //   Average: gc.average,
  // }))

  // const name = capitalize(profile.firstName)
  const name = "Bob"

  return (
    <>
      {/* <Radar data={radarData} /> */}
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
      <div style={{ opacity: 0.1 }}>
        {/* <Percentile /> */}
        {/* <HalfPie /> */}
        <Container maxWidth="sm" style={{ marginBottom: 40 }}>
          {/* <Typography>
            Only 1 in 10 children who take the 11+ exam get into grammar
            schools. You should aim to be in the blue section - the top 90%
          </Typography> */}
        </Container>
      </div>
    </>
  )
}

export default Stats
