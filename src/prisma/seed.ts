import { Category, User } from "@prisma/client"
import problems from "../../exams/one"
import { ExamWithProblems } from "../lib/types"
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
  const subEnds = new Date("2021-06-30T18:35:58.000Z")

  await prisma.user.createMany({
    data: [
      {
        id: "3fa5a38b-e8fc-41a7-95d0-04f438ec3ff3",
        email: "pannicope@gmail.com",
        firstName: "Bob",
        lastName: "b",
        parentName: "Henry",
        dob,
        gender: "male",
        admin: true,
        passwordHash:
          "$2b$10$0QPERpxW431jwQQSTh9H0uSFrxcfcT.9QhE3piaqKQgjssC44DpJK",
        stripeId: "cus_JifnHyNvFpbJIx",
        stripeSubId: "sub_JifnkftUVSP4Mg",
        subEnds,
      },
    ],
  })
}

const createGradedCatergories = async () => {
  const user1 = (await findUserByEmail("pannicope@gmail.com")) as User
  const user2 = (await findUserByEmail("henry@henrywu.co.uk")) as User

  const users = [user1, user2]

  const categories = Object.values(Category)

  users.forEach(async (u) => {
    categories.forEach(async (c) => {
      await prisma.gradedCategory.createMany({
        data: [
          {
            userId: u.id,
            category: c,
          },
        ],
      })
    })
  })
}

const createAnswers = async (exam: ExamWithProblems) => {
  const seedAnswers = exam.problems.map((p: any) => {
    const correct = Math.random() < 0.8
    const wrongAns = p.multi ? p.options[0] : "1"
    return {
      selected: correct ? p.correct : wrongAns,
      problemId: p.id,
    }
  })
  return seedAnswers
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
  await createGradedCatergories()
  const exam = await createExamFromJson(problems)
  const user = (await findUserByEmail("pannicope@gmail.com")) as User
  const examSession = await createExamSession(user.id, exam.id)
  const seedAnswers = await createAnswers(exam)

  console.log("Submitting exam")
  await submitExam(user.id, examSession.id, seedAnswers)
  console.log("Done")
}

main().catch((e) => {
  throw e
})
