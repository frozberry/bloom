import { AppBar, Toolbar, Button, Box } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { UserContext } from "../pages/_app"
import { signOut, useSession } from "next-auth/react"
// import stripeService from "../services/stripeService"

type HeaderProp = {
  link: string
  children: string
}

const Header = () => {
  // const user = useContext(UserContext)
  const { data: session } = useSession()

  const handleLogout = () => {
    // localStorage.removeItem("loggedWaterfrontUser")
    // location.href = "/login"
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/login` })
  }

  // const handlePortal = async () => {
  // const url = await stripeService.portal(stripe.stripeId)
  // window.location.replace(url)
  // alert("stripe portal")
  // }

  const HeaderItem = (props: HeaderProp) => {
    return (
      <Link href={props.link} passHref>
        <Button sx={{ color: "black" }}>{props.children}</Button>
      </Link>
    )
  }

  const loggedOut = () => (
    <>
      <HeaderItem link="/login">Log in</HeaderItem>
      <HeaderItem link="/signup">Get Started</HeaderItem>
    </>
  )

  const loggedIn = () => (
    <>
      <HeaderItem link="/results">Results</HeaderItem>
      <HeaderItem link="/stats">Stats</HeaderItem>
      <HeaderItem link="/account">Account</HeaderItem>
      <HeaderItem link="/account">{session.user.email}</HeaderItem>
      {/* <Button sx={{ color: "black" }} onClick={handlePortal}>
        Account
      </Button> */}
      {/* {user?.email === "pannicope@gmail.com" && (
        <HeaderItem link="/admin">Admin</HeaderItem>
      )} */}
      <Button sx={{ color: "black" }} onClick={handleLogout}>
        Log out
      </Button>
    </>
  )

  return (
    <>
      <AppBar position="static" style={{ margin: 0, backgroundColor: "white" }}>
        <Toolbar>
          <Link href={session ? "/home" : "/"} passHref>
            <Box
              sx={{
                display: "inline",
                cursor: "pointer",
                py: 1,
              }}
            >
              <Image
                src="/logo-text.png"
                alt="Waterfront"
                width={154}
                height={20}
              />
            </Box>
          </Link>
          {/* Somehow sets to the right of the app bar marginRight not needed here, but could play with positioning */}
          <section style={{ marginLeft: "auto", marginRight: 0 }}>
            {session ? loggedIn() : loggedOut()}
          </section>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
