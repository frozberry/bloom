import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSession } from "../hooks/useSession"

type LinkProps = {
  link: string
  children: string
  emphasis?: boolean
}

type FunctionProps = {
  // TODO use function type
  onClick: any
  children: string
  emphasis?: boolean
}

type ButtonProps = {
  onClick?: any
  children: string
  emphasis?: boolean
}

const HeaderButton = ({ onClick, emphasis, children }: ButtonProps) => {
  return (
    <Button
      variant={emphasis ? "contained" : "text"}
      color="primary"
      onClick={onClick}
      sx={{
        color: emphasis ? "white" : "black",
        textTransform: "none",
        px: 3,
        ml: emphasis ? 3 : 0,
        fontSize: "1rem",
      }}
    >
      {children}
    </Button>
  )
}

const HeaderLink = ({ link, children, emphasis }: LinkProps) => {
  return (
    <Link href={link} passHref>
      <HeaderButton emphasis={emphasis}>{children}</HeaderButton>
    </Link>
  )
}

const HeaderFunction = ({ onClick, children, emphasis }: FunctionProps) => {
  return (
    <HeaderButton onClick={onClick} emphasis={emphasis}>
      {children}
    </HeaderButton>
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
        <HeaderLink link="/results">Results</HeaderLink>
        <HeaderLink link="/stats">Stats</HeaderLink>
        <HeaderLink link="/account">Account</HeaderLink>
        <HeaderFunction onClick={handleLogout}>Log out</HeaderFunction>
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
            <HeaderLink link="/results">Results</HeaderLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <HeaderLink link="/stats">Stats</HeaderLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <HeaderLink link="/account">Account</HeaderLink>
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
    <HeaderLink link="/pricing">Pricing</HeaderLink>
    <HeaderLink link="/login">Contact</HeaderLink>
    <HeaderLink link="/login">Log in</HeaderLink>
    <HeaderLink link="/signup" emphasis={true}>
      Get Started
    </HeaderLink>
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
                src="/rose.png"
                alt="Bloom"
                width={32}
                height={32}
                priority
              />
            </Box>
          </Link>

          <Link href={session ? "/home" : "/"} passHref>
            <Box sx={{ cursor: "pointer" }}>
              <Typography
                color="textPrimary"
                sx={{ fontSize: 24, ml: 1, letterSpacing: 1, fontWeight: 700 }}
              >
                <b>Bloom</b>
              </Typography>
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
