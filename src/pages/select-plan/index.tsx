import { Alert, Box, Container, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import Bullets from "../../components/select-plan/Bullets"
import PlanOption from "../../components/select-plan/PlanOption"
import Questions from "../../components/select-plan/SubscriptionQuestions"
import { MySession } from "../../lib/types"
import { stripeCheckout } from "../../services/client/stripeClient"

const SelectPlan = ({ canceled }) => {
  const { data } = useSession()
  const session = data as MySession

  return (
    <>
      <Alert
        sx={{
          border: "1px solid #BCC3BC",
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        Please choose a plan to continue using Waterfront
      </Alert>
      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          sx={{ textAlign: "center", mb: 1 }}
        >
          <b>Choose a plan</b>
        </Typography>
        {canceled ? (
          <Typography sx={{ textAlign: "center", fontSize: 18 }}>
            Choose your plan to resume your subscription
          </Typography>
        ) : (
          <>
            <Typography sx={{ textAlign: "center", fontSize: 18 }}>
              Don't worry, you can change your plan at any time
            </Typography>
            <Typography style={{ textAlign: "center", fontSize: 18 }}>
              All plans come with a <b>14-day free trial</b>
            </Typography>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PlanOption
            title="Monthly"
            price="£19.99 / month"
            onClick={() =>
              stripeCheckout({
                item: "month",
                email: session.user.email,
              })
            }
          />
          <PlanOption
            title="Annual (2 months free)"
            price="£16.99 / month"
            onClick={() =>
              stripeCheckout({
                item: "year",
                email: session.user.email,
              })
            }
          />
        </Box>
        {!canceled ? (
          <Container
            sx={{ display: "flex", flexDirection: "row" }}
            maxWidth="md"
          >
            <Questions />
            <Bullets />
          </Container>
        ) : (
          <Container maxWidth="xs" sx={{ mb: 30 }}>
            <Bullets />
          </Container>
        )}
      </Container>
    </>
  )
}

export default SelectPlan
