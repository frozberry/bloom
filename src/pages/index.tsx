import { useSession } from "../hooks/useSession"
import { useRouter } from "next/router"
import { useEffect } from "react"
import HowItWorks from "../components/landing-page/HowItWorks"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import LandingHeader from "../components/landing-page/LandingHeader"
import WhatsBloom from "../components/landing-page/WhatsBloom"

const LandingPage = () => {
  const router = useRouter()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

  return (
    <>
      <LandingHeader />
      <WhatsBloom />
      <HowItWorks />
      <LandingGraphs />
      <LandingFooter />
    </>
  )
}

export default LandingPage
