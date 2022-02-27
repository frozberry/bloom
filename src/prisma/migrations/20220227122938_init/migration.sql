-- CreateEnum
CREATE TYPE "Category" AS ENUM ('NUMBERS', 'ADDITION_SUBTRACTION', 'MULTIPLICATION_DIVISION', 'FRACTIONS', 'MEASUREMENT', 'GEOMETRY', 'STATISTICS', 'RATIO_PROPORTION', 'ALGEBRA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "parentName" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "gender" TEXT,
    "passwordHash" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "profilePicture" TEXT,
    "stripeId" TEXT,
    "stripeSubId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "subEnds" TIMESTAMP(3),
    "score" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateSub" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "multi" BOOLEAN NOT NULL DEFAULT false,
    "correct" TEXT NOT NULL,
    "options" TEXT[],
    "unit" TEXT,
    "num" INTEGER NOT NULL,
    "img" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examId" TEXT NOT NULL,
    "categories" "Category"[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradedExam" (
    "id" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "num" INTEGER NOT NULL,
    "firstAttempt" BOOLEAN NOT NULL,
    "time" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "GradedExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradedProblem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correct" TEXT NOT NULL,
    "selected" TEXT,
    "num" INTEGER NOT NULL,
    "multi" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "options" TEXT[],
    "unit" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradedExamId" TEXT NOT NULL,
    "categories" "Category"[],

    CONSTRAINT "GradedProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSession" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "examId" TEXT,

    CONSTRAINT "ExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradedCategory" (
    "id" TEXT NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "GradedCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_num_key" ON "Exam"("num");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSession_userId_key" ON "ExamSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GradedCategory_userId_category_key" ON "GradedCategory"("userId", "category");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedExam" ADD CONSTRAINT "GradedExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedExam" ADD CONSTRAINT "GradedExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedProblem" ADD CONSTRAINT "GradedProblem_gradedExamId_fkey" FOREIGN KEY ("gradedExamId") REFERENCES "GradedExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedCategory" ADD CONSTRAINT "GradedCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
