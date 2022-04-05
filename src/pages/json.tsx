import { Typography, Container, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const getUsers = async () => {
  const res = await axios.get("/api/users")
  return res.data
}

const Page = () => {
  const [users, setUsers] = useState()

  const onClick = async () => {
    const users = await getUsers()
    const json = JSON.stringify(users, null, 2)
    setUsers(json)
  }

  return (
    <Container>
      <Typography>json</Typography>
      <Button onClick={onClick}>Get</Button>
      {users && users}
    </Container>
  )
}

export default Page
