// import { useDispatch, useSelector } from "react-redux"
// import { Link, useHistory } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
// import stripeService from "../services/stripeService"

// import { clearUser } from "../reducers/userReducer"
// import { clearProfile } from "../reducers/profileReducer"
// import { clearTest } from "../reducers/testReducer"
// import { clearStripe } from "../reducers/stripeReducer"

type HeaderProp = {
  link: string
  children: string
}

const Header = () => {
  //   const user = useSelector((state) => state.user)
  //   const stripe = useSelector((state) => state.stripe)

  //   const handleLogout = (event) => {
  //     event.preventDefault()
  //     dispatch(clearUser())
  //     dispatch(clearProfile())
  //     dispatch(clearTest())
  //     dispatch(clearStripe())
  //     history.push("/")
  //   }

  //   const handlePortal = async () => {
  //     const url = await stripeService.portal(stripe.stripeId)
  //     window.location.replace(url)
  //   }

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

  //   const loggedIn = () => (
  //     <>
  //       <HeaderItem link="/results">Results</HeaderItem>
  //       <HeaderItem link="/stats">Stats</HeaderItem>
  //       <Button onClick={handlePortal}>Account</Button>
  //       {user.email === "pannicope@gmail.com" && (
  //         <HeaderItem link="/admin">Admin</HeaderItem>
  //       )}
  //       <Button onClick={handleLogout}>Log out</Button>
  //     </>
  //   )

  return (
    <>
      <AppBar position="static" style={{ margin: 0, backgroundColor: "white" }}>
        <Toolbar>
          <Link href="/" passHref>
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
          {/* somehow sets to the right of the app bar marginRight not needed here, but could play with positioning */}
          <section style={{ marginLeft: "auto", marginRight: 0 }}>
            {/* {user ? loggedIn() : loggedOut()} */}
            {loggedOut()}
          </section>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
