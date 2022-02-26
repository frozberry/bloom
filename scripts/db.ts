import problems from "../exams/one"
import { prisma } from "../src/prisma/client"
import { createExam } from "../src/services/examService"

const main = async () => {
  for (let index = 0; index < 50; index++) {
    console.log(index)
    await createExam(problems)
  }
}

main().catch((e) => {
  throw e
})
