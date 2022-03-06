import { Container, Typography } from "@mui/material"
import dayjs from "dayjs"

const Questions = () => {
  const date = dayjs().add(7, "days").format("MMM D, YYYY")
  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: 1,
        }}
        color="textPrimary"
      >
        What's included in the free trial?
      </Typography>
      <Typography paragraph>
        Your 14-Day Trial is completely free and gives you full access to the
        Waterfront platform until <b>{date}</b>. Cancel any time.
      </Typography>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: 1,
        }}
        color="textPrimary"
      >
        Will my card be charged right now?
      </Typography>
      <Typography paragraph>
        No. You won’t be charged until after your free trial ends on{" "}
        <b>{date}</b>. After your free trial, your plan will continue until you
        decide to downgrade or cancel.
      </Typography>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: 1,
        }}
        color="textPrimary"
      >
        What if I change my mind - can I change or cancel my plan?
      </Typography>
      <Typography paragraph>
        Yes, you cancel your subscription or switch to a new plan anytime from
        your account dashboard with zero hassle.
      </Typography>
    </Container>
  )
}
export default Questions
