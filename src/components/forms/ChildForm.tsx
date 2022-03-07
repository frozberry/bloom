import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import { signup } from "../../services/client/accountClient"
import FormTextField from "./FormTextField"

const SignupForm = () => {
  type FormValues = {
    firstName: string
    lastName: string
    dob: string
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    dob: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await axios.post("/api/profile", {
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.lastName,
        gender: "male",
      })
      console.log(res.data)

      // await signup(values.name, values.email, values.password)
      // signIn("credentials", {
      //   email: values.email,
      //   password: values.dob,
      //   callbackUrl: "/home",
      // })
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form noValidate autoComplete="off">
          <Box>
            <Typography variant="subtitle2">First name</Typography>
            <Field
              name="firstName"
              // placeholder="Name"
              autoComplete="name"
              size="small"
              component={FormTextField}
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Last name</Typography>
            <Field
              name="lastName"
              // placeholder="lastName"
              autoComplete="email"
              size="small"
              component={FormTextField}
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Date of birth</Typography>
            <Field
              name="dob"
              type="date"
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
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
