import { Box, Button, Container, Divider, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import GoogleSignIn from "../../components/GoogleSignIn"
import notifyError from "../../lib/notifyError"
import { signup } from "../../services/client/accountClient"

export default function App() {
  type FormValues = {
    name: string
    email: string
    password: string
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await signup(values.name, values.email, values.password)
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/home",
      })
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
    }
  }

  return (
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Box>
              <Typography variant="subtitle2">Parent's Full Name</Typography>
              <Field
                name="name"
                placeholder="Name"
                autoComplete="name"
                size="small"
                component={FormTextField}
                fullWidth
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">Parent's Email</Typography>
              <Field
                name="email"
                placeholder="Email"
                autoComplete="email"
                size="small"
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
                autoComplete="password"
                size="small"
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
      <Typography variant="body1" sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Login here</Link>
      </Typography>
    </Container>
  )
}
