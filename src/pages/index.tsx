import LandingHeader from "../components/landing-page/LandingHeader"
import HowItWorks from "../components/landing-page/HowItWorks"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"
import { useEffect } from "react"
import axios from "axios"

const LandingPage = () => {
  useEffect(() => {
    const foo = async () => {
      const res: any = await axios.get("/api/users")
      console.log(res.data.name)
    }
    foo()
  }, [])
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
