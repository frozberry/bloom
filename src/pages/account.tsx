import { Box, Button, Container, Divider, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import * as yup from "yup"
import ChildForm from "../components/forms/ChildForm"
import FormTextField from "../components/forms/FormTextField"
import useAuthQuery from "../hooks/useAuthQuery"
import notifyError from "../lib/notifyError"
import { changePassword, isUserOAuth } from "../services/client/accountClient"

export default function App() {
  const { data, escape, component } = useAuthQuery("isOAuth", isUserOAuth)
  if (escape) return component

  const isOAuth = data as boolean

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
    <Container maxWidth="xs" sx={{ pt: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Child's details
      </Typography>
      <ChildForm />
      {!isOAuth && (
        <>
          <Divider sx={{ my: 4 }} />
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
                  <Typography variant="subtitle2">New password</Typography>
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
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  )
}