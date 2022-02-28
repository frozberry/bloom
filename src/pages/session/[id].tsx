import { Container, Typography } from "@mui/material"
import { useRouter } from "next/router"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  return (
    <Container>
      <Typography>{id}</Typography>
    </Container>
  )
}

export default Page
