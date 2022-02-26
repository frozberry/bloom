import LandingHeader from "../components/landing-page/LandingHeader"
import HowItWorks from "../components/landing-page/HowItWorks"
import WhatsWaterfront from "../components/landing-page/WhatsWaterfront"
import LandingFooter from "../components/landing-page/LandingFooter"
import LandingGraphs from "../components/landing-page/LandingGraphs"

const LandingPage = () => {
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
