import {
  Alert,
  Box,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Bullets from "../components/select-plan/Bullets"
import PlanOption from "../components/select-plan/PlanOption"
import Questions from "../components/select-plan/SubscriptionQuestions"
import notifyError from "../lib/notifyError"
import { MySession } from "../lib/types"
import { stripeCheckout } from "../services/client/stripeClient"

const SelectPlan = ({ canceled = false }: { canceled: boolean }) => {
  const [stripeLoading, setStripeLoading] = useState(false)
  const { data } = useSession()
  const session = data as MySession

  const handleCheckout = async (plan: string) => {
    setStripeLoading(true)
    try {
      await stripeCheckout(plan, session.user.email)
    } catch (e) {
      notifyError(e)
      setStripeLoading(false)
    }
  }

  return (
    <>
      {stripeLoading && <LinearProgress />}
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
            onClick={() => handleCheckout("month")}
          />
          <PlanOption
            title="Annual (2 months free)"
            price="£16.99 / month"
            onClick={() => handleCheckout("year")}
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
