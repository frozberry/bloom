import { HeaderLink } from "./HeaderComponents"

const LoggedOut = () => (
  <>
    <HeaderLink link="/pricing">Pricing</HeaderLink>
    <HeaderLink link="/login">Contact</HeaderLink>
    <HeaderLink link="/login">Log in</HeaderLink>
    <HeaderLink link="/signup" emphasis={true}>
      Get Started
    </HeaderLink>
  </>
)

export default LoggedOut
