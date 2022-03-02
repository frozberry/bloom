import { Container, Typography, Button, Box } from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import notifyError from "../../lib/notifyError"
import { changePassword } from "../../services/client/accountClient"

export default function App() {
  type FormValues = {
    currentPassword: string
    newPassword: string
  }

  const initialValues = {
    currentPassword: "",
    newPassword: "",
  }

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required("Required"),
    newPassword: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await changePassword(values.currentPassword, values.newPassword)
      formikHelpers.resetForm()
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Change password</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Box>
              <Typography variant="subtitle2">Current password</Typography>
              <Field
                name="currentPassword"
                placeholder="********"
                type="password"
                size="small"
                component={FormTextField}
                fullWidth
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">New assword</Typography>
              <Field
                name="newPassword"
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
              align="center"
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
