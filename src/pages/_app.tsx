import { CacheProvider, EmotionCache } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "react-query"
import Header from "../components/Header"
import createEmotionCache from "../lib/createEmotionCache"
import "../styles.css"
import theme from "../styles/theme"
import PlausibleProvider from "next-plausible"

const queryClient = new QueryClient()

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Waterfront 11+ Exam Preparation</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <PlausibleProvider domain="https://waterfront-five.vercel.app/">
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              <Toaster />
              <Component {...pageProps} />
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </PlausibleProvider>
    </CacheProvider>
  )
}
