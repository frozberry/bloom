import { User } from "@prisma/client"
import problems from "../../exams/one"
import seedAnswers from "../lib/seedAnswers"
import { createExamFromJson } from "../services/server/examService"
import { createExamSession } from "../services/server/examSessionService"
import { submitExam } from "../services/server/gradedExamService"
import { findUserByEmail } from "../services/server/userService"
import { prisma } from "./client"

const deleteAll = async () => {
  await prisma.gradedProblem.deleteMany()
  await prisma.gradedCategory.deleteMany()
  await prisma.gradedExam.deleteMany()
  await prisma.examSession.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.user.deleteMany()
}

const createUsers = async () => {
  const dob = new Date("2010-01-01T00:00:00.000Z")
  const subEnds = new Date("2031-06-30T18:35:58.000Z")

  await prisma.user.create({
    data: {
      id: "3fa5a38b-e8fc-41a7-95d0-04f438ec3ff3",
      email: "pannicope@gmail.com",
      firstName: "Bob",
      lastName: "b",
      name: "Henry",
      gender: "male",
      dob,
      admin: true,
      passwordHash:
        "$2b$10$7f2Zo6SqU6E7r./LmGDkSOsQNSpcGTRiIKHpx/.ZK0G7sxTXskXsq",
      stripeId: "cus_JifnHyNvFpbJIx",
      stripeSubId: "sub_JifnkftUVSP4Mg",
      subEnds,
    },
  })
}

const main = async () => {
  const args = process.argv.slice(2)
  const reset = args.includes("--reset")

  if (reset) {
    console.log("Resetting database")
    await deleteAll()
    return
  }

  console.log("Seeding database")

  await deleteAll()
  await createUsers()
  const exam = await createExamFromJson(problems)
  const user = (await findUserByEmail("pannicope@gmail.com")) as User
  const examSession = await createExamSession(user.id, exam.id)
  const answers = await seedAnswers(exam)

  console.log("Submitting exam")
  await submitExam(user.id, examSession.id, answers)
  console.log("Done")
}

main().catch((e) => {
  throw e
})
