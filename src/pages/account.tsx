import { Box, Container, Divider, Typography } from "@mui/material"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"
import ChildForm from "../components/forms/ChildForm"
import useAuthQuery from "../hooks/useAuthQuery"
import { UserProfile } from "../lib/types"
import { isUserOAuth } from "../services/client/accountClient"
import { findUsersProfile } from "../services/client/profileClient"

type Data = {
  profile: UserProfile
  isOAuth: boolean
}

const getAccountInfo = async (): Promise<Data> => {
  const profile = await findUsersProfile()
  const isOAuth = await isUserOAuth()
  return { profile, isOAuth }
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
    </Container>
  )
}
