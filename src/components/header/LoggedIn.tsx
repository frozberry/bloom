import MenuIcon from "@mui/icons-material/Menu"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { HeaderButton, HeaderLink } from "./HeaderComponents"

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
        <HeaderButton onClick={handleLogout}>Log out</HeaderButton>
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

export default LoggedIn
