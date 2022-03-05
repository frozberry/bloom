import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import HowItWorks from "../components/landing-page/HowItWorks"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import LandingHeader from "../components/landing-page/LandingHeader"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"

const LandingPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

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
