import { Box, Button, Typography } from "@mui/material"
import dayjs from "dayjs"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import toast from "react-hot-toast"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import { UserProfile } from "../../lib/types"
import { updateProfile } from "../../services/client/profileClient"
import FormTextField from "./FormTextField"

type Props = {
  profile: UserProfile
}

const ChildForm = ({ profile }: Props) => {
  type FormValues = {
    firstName: string
    lastName: string
    dob: string
  }

  const initialValues = {
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    dob: profile.dob ? dayjs(profile.dob).format("YYYY-MM-DD") : "",
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
      updateProfile(values.firstName, values.lastName, values.dob, "male")
      toast.success("Details updated succesfully")
      formikHelpers.setSubmitting(false)
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
              autoComplete="name"
              size="small"
              component={FormTextField}
              fullWidth
              style={{ textTransform: "capitalize" }}
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

export default ChildForm
