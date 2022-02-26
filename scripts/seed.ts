import { prisma } from "../src/prisma/client"
import { createExam } from "../src/services/examService"
import { submitExam } from "../src/services/gradedExamService"
import problems from "../exams/one"
import { findUserByEmail } from "../src/services/userService"

const categories = [
  { name: "numbers" },
  { name: "addition and subtraction" },
  { name: "multiplication and division" },
  { name: "fractions" },
  { name: "measurement" },
  { name: "geometry" },
  { name: "statistics" },
  { name: "ratio and proportion" },
  { name: "algebra" },
]

const deleteAll = async () => {
  await prisma.gradedProblem.deleteMany()
  await prisma.gradedCategory.deleteMany()
  await prisma.gradedExam.deleteMany()
  await prisma.category.deleteMany()
  await prisma.examSession.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.user.deleteMany()
}

const createCategories = async () => {
  await prisma.category.createMany({
    data: categories,
  })
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
        passwordHash:
          "$2b$10$8GfTVRlKhQz0eKQl5w4ycuhhSlXGQ.oFzPRdEljrcQkHYXm.PEChG",
        stripeId: "cus_JifnHyNvFpbJIx",
        stripeSubId: "sub_JifnkftUVSP4Mg",
        subEnds,
      },
      {
        id: "8f0c3193-6ca3-4b51-8818-eb16390fd7f9",
        email: "henry@henrywu.co.uk",
        firstName: "Tomothy",
        lastName: "T",
        parentName: "Henry",
        dob,
        gender: "male",
        passwordHash:
          "$2b$10$8GfTVRlKhQz0eKQl5w4ycuhhSlXGQ.oFzPRdEljrcQkHYXm.PEChG",
        stripeId: "cus_JifnHyNvFpbJIx",
        stripeSubId: "sub_JifnkftUVSP4Mg",
        subEnds,
      },
    ],
  })
}

const createGradedCatergories = async () => {
  const user1 = await findUserByEmail("pannicope@gmail.com")
  const user2 = await findUserByEmail("henry@henrywu.co.uk")

  const users = [user1, user2]

  users.forEach(async (u) => {
    categories.forEach(async (c) => {
      await prisma.gradedCategory.createMany({
        data: [
          {
            userId: u!.id,
            categoryName: c.name,
          },
        ],
      })
    })
  })
}

const getUser = async () => {
  const user = await findUserByEmail("pannicope@gmail.com")
  return user
}

const createExamSession = async (user: any, exam: any) => {
  await prisma.examSession.create({
    data: {
      userId: user.id,
      examId: exam.id,
    },
  })
}

const createAnswers = async (exam: any) => {
  const seedAnswers = exam.problems.map((p: any) => {
    const correct = Math.random() < 0.8
    const wrongAns = p.multi ? p.options[0] : 1
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
    await createCategories()
    return
  }

  console.log("Seeding database")
  await deleteAll()
  await createCategories()
  await createUsers()
  await createGradedCatergories()
  const exam = await createExam(problems)
  const user = await getUser()
  await createExamSession(user, exam)
  const seedAnswers = await createAnswers(exam)

  console.log("Submitting exam")
  await submitExam(user!, exam.id, seedAnswers)
  console.log("Done")
}

main().catch((e) => {
  throw e
})
