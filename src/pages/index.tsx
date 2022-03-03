import LandingHeader from "../components/landing-page/LandingHeader"
import HowItWorks from "../components/landing-page/HowItWorks"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

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
