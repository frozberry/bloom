import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import GoogleSignIn from "../../components/GoogleSignIn"
import notifyError from "../../lib/notifyError"

// User already has a Google account, but tries to sign in with login
// User already has login, but tries to sign in with Google
// Account doesn't exist at all

export default function App() {
  const router = useRouter()
  const { error } = router.query
  const oAuthError = error === "OAuthAccountNotLinked"

  type FormValues = {
    email: string
    password: string
  }

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
  })

  const callbackUrl = "/home"

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post("/api/auth/verify-login", {
        email: values.email,
        password: values.password,
      })
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
      })
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
    }
  }

  return (
    <>
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Box>
                <Typography variant="subtitle2">Parent's Email</Typography>
                <Field
                  name="email"
                  placeholder="Email"
                  size="small"
                  autoComplete="email"
                  component={FormTextField}
                  fullWidth
                />
              </Box>
              <Box>
                <Typography variant="subtitle2">Password</Typography>
                <Field
                  name="password"
                  placeholder="********"
                  type="password"
                  size="small"
                  autoComplete="password"
                  component={FormTextField}
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                disabled={formikProps.isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          <Link href="/forgot-password">Forgot password?</Link>
          {" · "}
          <Link href="/signup">Sign up for an account</Link>
        </Typography>
      </Container>
    </>
  )
}
