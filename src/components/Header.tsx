import { AppBar, Toolbar, Button, Box, MenuItem, Menu } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { MySession } from "../lib/types"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
// import stripeService from "../services/stripeService"

type HeaderProp = {
  link: string
  children: string
}

const Header = () => {
  const { data } = useSession()
  const session = data as MySession

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
    <Box>
      <Box sx={{ display: { xs: "none", sm: "initial" } }}>
        <HeaderItem link="/results">Results</HeaderItem>
        <HeaderItem link="/stats">Stats</HeaderItem>
        <HeaderItem link="/account">Account</HeaderItem>
        <Button sx={{ color: "black" }} onClick={handleLogout}>
          Log out
        </Button>
      </Box>

      <Box sx={{ display: { xs: "initial", sm: "none" } }}>
        <MenuIcon
          fontSize="large"
          color="primary"
          sx={{ color: "black" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <HeaderItem link="/results">Results</HeaderItem>
          </MenuItem>
          <MenuItem>
            <HeaderItem link="/stats">Stats</HeaderItem>
          </MenuItem>
          <MenuItem>
            <HeaderItem link="/ccount">Account</HeaderItem>
          </MenuItem>
          <MenuItem>
            <Button sx={{ color: "black" }} onClick={handleLogout}>
              Log out
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
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
