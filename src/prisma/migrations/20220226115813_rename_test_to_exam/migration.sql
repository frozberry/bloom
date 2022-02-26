/*
  Warnings:

  - You are about to drop the column `gradedTestId` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `testId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the `GradedTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gradedExamId` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GradedProblem" DROP CONSTRAINT "GradedProblem_gradedTestId_fkey";

-- DropForeignKey
ALTER TABLE "GradedTest" DROP CONSTRAINT "GradedTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "GradedTest" DROP CONSTRAINT "GradedTest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_testId_fkey";

-- DropForeignKey
ALTER TABLE "TestSession" DROP CONSTRAINT "TestSession_testId_fkey";

-- DropForeignKey
ALTER TABLE "TestSession" DROP CONSTRAINT "TestSession_userId_fkey";

-- AlterTable
ALTER TABLE "GradedProblem" DROP COLUMN "gradedTestId",
ADD COLUMN     "gradedExamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "testId",
ADD COLUMN     "examId" TEXT NOT NULL;

-- DropTable
DROP TABLE "GradedTest";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestSession";

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ExamSession" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "examId" TEXT,

    CONSTRAINT "ExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_num_key" ON "Exam"("num");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSession_userId_key" ON "ExamSession"("userId");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedExam" ADD CONSTRAINT "GradedExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedExam" ADD CONSTRAINT "GradedExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedProblem" ADD CONSTRAINT "GradedProblem_gradedExamId_fkey" FOREIGN KEY ("gradedExamId") REFERENCES "GradedExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
