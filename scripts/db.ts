import { prisma } from "../src/prisma/client"

const main = async () => {
  await prisma.exam.deleteMany()
}

main().catch((e) => {
  throw e
})
