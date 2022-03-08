import {
  Alert,
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import LoginForm from "../components/forms/LoginForm"
import GoogleSignIn from "../components/GoogleSignIn"

export default function App() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { error } = router.query
  const oAuthError = error === "OAuthAccountNotLinked"

  return (
    <>
      {loading && <LinearProgress />}
      {oAuthError && (
        <Alert severity="error" hidden={!oAuthError}>
          This account doesn't use Google sign in. Please log in with your email
          and password.{" "}
        </Alert>
      )}
      <Container maxWidth="xs">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2">Log in</Typography>
        </Box>

        <GoogleSignIn />
        <Divider sx={{ color: "text.secondary", mb: 2 }}>
          or continue with email
        </Divider>
        <LoginForm setLoading={setLoading} />

        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          <Link href="/forgot-password">Forgot password?</Link>
          {" · "}
          <Link href="/signup">Sign up for an account</Link>
        </Typography>
      </Container>
    </>
  )
}
