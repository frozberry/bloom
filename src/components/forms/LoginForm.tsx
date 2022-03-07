import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import FormTextField from "./FormTextField"

// User already has a Google account, but tries to sign in with login
// User already has login, but tries to sign in with Google
// Account doesn't exist at all

const LoginForm = () => {
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

  const callbackUrl = "/home"

  return (
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
  )
}

export default LoginForm
