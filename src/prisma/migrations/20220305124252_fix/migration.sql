/*
  Warnings:

  - You are about to drop the column `question` on the `GradedProblem` table. All the data in the column will be lost.
  - Made the column `examId` on table `ExamSession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "GradedExam_num_key";

-- AlterTable
ALTER TABLE "ExamSession" ALTER COLUMN "examId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GradedProblem" DROP COLUMN "question";
