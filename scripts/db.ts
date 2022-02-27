import { Category } from "@prisma/client"
import problems from "../exams/one"
import { prisma } from "../src/prisma/client"
import { createExam } from "../src/services/examService"

const main = async () => {
  await prisma.gradedCategory.create({
    data: {
      userId: "asdfkl;jsdfk",
      category: Category.STATISTICS,
    },
  })
}

main().catch((e) => {
  throw e
})
