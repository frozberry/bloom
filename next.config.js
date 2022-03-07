import { withPlausibleProxy } from "next-plausible"

module.exports = withPlausibleProxy()({
  images: {
    domains: ["i.imgur.com"],
  },
  swcMinify: true,
})
