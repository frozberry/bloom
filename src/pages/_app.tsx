import Head from "next/head"
import { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider, EmotionCache } from "@emotion/react"

import theme from "../styles/theme"
import createEmotionCache from "../lib/createEmotionCache"
import Header from "../components/Header"
import "../styles.css"

import { QueryClient, QueryClientProvider, useQuery } from "react-query"
const queryClient = new QueryClient()

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Waterfront 11+ Exam Preparation</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  )
}
