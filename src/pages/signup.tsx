import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography
} from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import SignupForm from "../components/forms/SignupForm"
import GoogleSignIn from "../components/GoogleSignIn"

export default function App() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading && <LinearProgress />}
      <Container maxWidth="xs">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2">Create an account</Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
            Join Bloom to start working towards your child's grammar school
            placement school today today.
          </Typography>
        </Box>

        <GoogleSignIn />
        <Divider sx={{ color: "text.secondary", mb: 2 }}>
          or continue with email
        </Divider>

        <SignupForm setLoading={setLoading} />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login here</Link>
        </Typography>
      </Container>
    </>
  )
}
