import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSession } from "../hooks/useSession"

type Props = {
  link: string
  children: string
}
const HeaderItem = (props: Props) => {
  return (
    <Link href={props.link} passHref>
      <Button sx={{ color: "black" }}>{props.children}</Button>
    </Link>
  )
}

const LoggedIn = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/login` })
  }
  return (
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
          onClick={handleMenu}
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
          <MenuItem onClick={handleClose}>
            <HeaderItem link="/results">Results</HeaderItem>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <HeaderItem link="/stats">Stats</HeaderItem>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <HeaderItem link="/account">Account</HeaderItem>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button sx={{ color: "black" }} onClick={handleLogout}>
              Log out
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

const LoggedOut = () => (
  <>
    <HeaderItem link="/login">Log in</HeaderItem>
    <HeaderItem link="/signup">Get Started</HeaderItem>
  </>
)

const Header = () => {
  const { session } = useSession()

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
            {session ? <LoggedIn /> : <LoggedOut />}
          </section>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
