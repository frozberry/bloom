import { Container, Typography, Button, Box } from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import Image from "next/image"
import Link from "next/link"

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

const onSubmit = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>
) => {
  alert(values.name)
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
        <Typography variant="h2">Create an account</Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Fill out the form to start working towards your child's grammar
          placement school today today.
        </Typography>
      </Box>

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
      <Typography variant="body1" sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Login here</Link>
      </Typography>
    </Container>
  )
}
