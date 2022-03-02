import { Container, Typography, Button, Box } from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import Link from "next/link"
import axios from "axios"
import { NextRouter, useRouter } from "next/router"

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
  formikHelpers: FormikHelpers<FormValues>,
  router: NextRouter
) => {
  const res = await axios.post("/api/login", {
    email: values.email,
    password: values.password,
  })

  if (res.status === 200) {
    localStorage.setItem(
      "loggedWaterfrontUser",
      JSON.stringify({ token: res.data })
    )
    router.push("/home")
    router.reload()
  }

  formikHelpers.setSubmitting(false)
}

export default function App() {
  const router = useRouter()
  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Log in</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, router)
        }
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
