import { Box, Container, Typography } from "@mui/material"
import Router from "next/router"
import Bullets from "../components/select-plan/Bullets"
import PlanOption from "../components/select-plan/PlanOption"
import Questions from "../components/select-plan/SubscriptionQuestions"

const SelectPlan = () => {
  // This could be a Link
  // But it was quicker to use a function since
  // The shared component uses onClick

  const onClick = () => {
    Router.push("/signup")
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        color="textPrimary"
        sx={{ textAlign: "center", mb: 1 }}
      >
        {/* <b>The best investment you will make for you child's uture</b>
        <b>Invest in your child's future with a Bloom subscription</b>
        <b>Bloom is the best investment in your child's future</b>
        <b>
          A Bloom subscription is the best investment in your child's future
        </b>
        <b>Bloom is the smartest investment in your child's future</b>
        <b>The best investment in your child's future you'll ever make</b> */}
        <b>Invest in your child's future today</b>
      </Typography>
      <Typography style={{ textAlign: "center", fontSize: 18 }}>
        All plans come with a <b>14-day free trial</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlanOption title="Monthly" price="£19.99 / month" onClick={onClick} />
        <PlanOption
          title="Annual (2 months free)"
          price="£16.99/ month"
          onClick={onClick}
        />
      </Box>

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          mt: { xs: 2, sm: 5 },
        }}
        maxWidth="md"
      >
        <Questions />
        <Bullets />
      </Container>
    </Container> //
  )
}

export default SelectPlan
