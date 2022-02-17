import { Container, Typography, Button, Box } from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik"
import * as yup from "yup"
import FormTextField from "../components/forms/FormTextField"
import Image from "next/image"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { prisma } from "../lib/prisma"

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()
  return {
    props: {
      users,
    },
  }
}

type FormValues = {
  email: string
  password: string
}

type User = {
  id: number
  name: string
}

type ComponentProps = {
  users: User[]
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

export default function App({ users }: ComponentProps) {
  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Log in</Typography>
      </Box>

      {users.map((u: User) => (
        <p key={u.id}>{u.name}</p>
      ))}

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
