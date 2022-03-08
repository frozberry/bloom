import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material"
import Image from "next/image"
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
          <Box sx={{ width: 40, mx: "auto" }}>
            <Image
              src="/logo.png"
              alt="Waterfront"
              layout="responsive"
              width={512}
              height={512}
            />
          </Box>
          <Typography variant="h2">Create an account</Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
            Join Waterfront to start working towards your child's grammar school
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
