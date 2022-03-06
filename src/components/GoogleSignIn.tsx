import { Box } from "@mui/material"
import { signIn } from "next-auth/react"
import GoogleButton from "react-google-button"

const GoogleSignIn = () => {
  return (
    <Box
      mb={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GoogleButton
        onClick={() => signIn("google", { callbackUrl: "/home" })}
        type="dark"
        style={{ width: "100%" }}
      />
    </Box>
  )
}
export default GoogleSignIn
