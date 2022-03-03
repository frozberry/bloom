import LandingHeader from "../components/landing-page/LandingHeader"
import HowItWorks from "../components/landing-page/HowItWorks"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import { useContext, useEffect } from "react"
import { UserContext } from "./_app"
import { useRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/react"

const LandingPage = () => {
  // const user = useContext(UserContext)
  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])
  console.log("session", session)

  return (
    <>
      <LandingHeader />
      <WhatsWaterfront />
      <HowItWorks />
      <LandingGraphs />
      <LandingFooter />
    </>
  )
}

export default LandingPage
