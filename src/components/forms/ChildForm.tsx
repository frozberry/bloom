import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import dayjs from "dayjs"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { attempt } from "lodash"
import toast from "react-hot-toast"
import * as yup from "yup"
import useAuthQuery from "../../hooks/useAuthQuery"
import nameCase from "../../lib/nameCase"
import notifyError from "../../lib/notifyError"
import { gu } from "../../services/client/userClient"
import FormTextField from "./FormTextField"

const ChildForm = () => {
  const { escape, component, data } = useAuthQuery("getUser", gu)
  if (escape) return component
  console.log(data)

  type FormValues = {
    firstName: string
    lastName: string
    dob: string
  }

  const initialValues = {
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : "",
  }
  console.log(data.dob)

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
      await axios.post("/api/profile", {
        firstName: nameCase(values.firstName),
        lastName: nameCase(values.lastName),
        dob: new Date(values.dob),
        gender: "male",
      })
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
