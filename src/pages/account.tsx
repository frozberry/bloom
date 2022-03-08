import { Box, Button, Container, Divider, Typography } from "@mui/material"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"
import ChildForm from "../components/forms/ChildForm"
import useAuthQuery from "../hooks/useAuthQuery"
import { UserProfile } from "../lib/types"
import { isUserOAuth } from "../services/client/accountClient"
import { findUsersProfile } from "../services/client/profileClient"
import { stripePortalUrl } from "../services/client/stripeClient"

type Data = {
  profile: UserProfile
  isOAuth: boolean
}

const getAccountInfo = async (): Promise<Data> => {
  const profile = await findUsersProfile()
  const isOAuth = await isUserOAuth()
  return { profile, isOAuth }
}

const openPortal = async () => {
  const url = await stripePortalUrl("cus_JifnHyNvFpbJIx")
  window.open(url)
}

export default function App() {
  const { data, escape, component } = useAuthQuery(
    "accountForms",
    getAccountInfo
  )
  if (escape) return component

  const { profile, isOAuth } = data as Data

  return (
    <Container maxWidth="xs" sx={{ pt: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Child's details
      </Typography>
      <ChildForm profile={profile} />
      {!isOAuth && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ my: 4 }}>
            <Typography variant="h2">Change password</Typography>
          </Box>
          <ChangePasswordForm />
        </>
      )}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" sx={{ my: 2 }}>
        Membership and billing
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Click here to access our secure billing portal
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        fullWidth
        onClick={openPortal}
      >
        Payments portal
      </Button>
    </Container>
  )
}
