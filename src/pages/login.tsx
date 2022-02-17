import { Container, Typography, Button, Box } from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik"
import * as yup from "yup"
import FormTextField from "../components/forms/FormTextField"
import Image from "next/image"
import Link from "next/link"

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

const onSubmit = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>
) => {
  alert(values.email)
  alert(values.password)
  formikHelpers.setSubmitting(false)
}

export default function App() {
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
        <Typography variant="h2">Log in</Typography>
      </Box>

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
  )
}
