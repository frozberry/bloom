import { Typography, Container } from "@mui/material"
import ContactForm from "../components/forms/ContactForm"

const Contact = () => {
  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      <Typography variant="h1">Contact</Typography>
      <ContactForm />
    </Container>
  )
}

export default Contact
