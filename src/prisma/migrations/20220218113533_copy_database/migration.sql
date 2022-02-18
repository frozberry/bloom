/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateSub" TIMESTAMP(3),
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "parentName" TEXT NOT NULL,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "stripeId" TEXT,
ADD COLUMN     "stripeSubId" TEXT,
ADD COLUMN     "subEnds" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
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
    "testId" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradedTest" (
    "id" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "num" INTEGER NOT NULL,
    "firstAttempt" BOOLEAN NOT NULL,
    "time" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "GradedTest_pkey" PRIMARY KEY ("id")
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
    "gradedTestId" TEXT NOT NULL,

    CONSTRAINT "GradedProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestSession" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "testId" TEXT,

    CONSTRAINT "TestSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "GradedCategory" (
    "id" TEXT NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "GradedCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProblem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToGradedProblem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_num_key" ON "Test"("num");

-- CreateIndex
CREATE UNIQUE INDEX "TestSession_userId_key" ON "TestSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GradedCategory_userId_categoryName_key" ON "GradedCategory"("userId", "categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProblem_AB_unique" ON "_CategoryToProblem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProblem_B_index" ON "_CategoryToProblem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGradedProblem_AB_unique" ON "_CategoryToGradedProblem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGradedProblem_B_index" ON "_CategoryToGradedProblem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedTest" ADD CONSTRAINT "GradedTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedTest" ADD CONSTRAINT "GradedTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedProblem" ADD CONSTRAINT "GradedProblem_gradedTestId_fkey" FOREIGN KEY ("gradedTestId") REFERENCES "GradedTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSession" ADD CONSTRAINT "TestSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSession" ADD CONSTRAINT "TestSession_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedCategory" ADD CONSTRAINT "GradedCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradedCategory" ADD CONSTRAINT "GradedCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProblem" ADD FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProblem" ADD FOREIGN KEY ("B") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGradedProblem" ADD FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGradedProblem" ADD FOREIGN KEY ("B") REFERENCES "GradedProblem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
