/*
  Warnings:

  - You are about to drop the column `date` on the `GradedExam` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `GradedExam` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `multi` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `num` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `GradedProblem` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `GradedProblem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[num]` on the table `GradedExam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalMarks` to the `GradedExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemId` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradedExam" DROP COLUMN "date",
DROP COLUMN "total",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalMarks" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GradedProblem" DROP COLUMN "date",
DROP COLUMN "img",
DROP COLUMN "multi",
DROP COLUMN "num",
DROP COLUMN "options",
DROP COLUMN "unit",
ADD COLUMN     "problemId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GradedExam_num_key" ON "GradedExam"("num");

-- AddForeignKey
ALTER TABLE "GradedProblem" ADD CONSTRAINT "GradedProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
