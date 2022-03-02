import LandingHeader from "../components/landing-page/LandingHeader"
import HowItWorks from "../components/landing-page/HowItWorks"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import { useContext, useEffect } from "react"
import { UserContext } from "./_app"
import { useRouter } from "next/router"

const LandingPage = () => {
  const user = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/home")
    }
  }, [user, router])

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
