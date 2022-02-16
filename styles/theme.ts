import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { red } from "@mui/material/colors"

declare module "@mui/material/styles" {
  interface Palette {
    lightBlue: Palette["primary"]
  }
  interface PaletteOptions {
    lightBlue: PaletteOptions["primary"]
  }
}

let theme = createTheme({
  palette: {
    // primary: {
    //   main: "#556cd6",
    // },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: "#0F1B35",
    // },
    lightBlue: {
      main: "#D8E2FC",
    },
  },
  typography: {
    body1: {
      fontSize: "1.25rem",
      lineHeight: 1.8,
      marginBottom: 24,
      color: "#4E616C",
    },
    h1: {
      color: "white",
      letterSpacing: 1.5,
      textAlign: "center",
      marginTop: "1vh",
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      textAlign: "center",
      fontWeight: "bold",
      color: "#232129",
    },
    h3: {
      // fontSize: "1.75rem",
      marginBottom: 24,
      alignSelf: "flex-start",
      fontWeight: "bold",
      color: "#232129",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
