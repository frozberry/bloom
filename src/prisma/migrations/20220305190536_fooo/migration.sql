/*
  Warnings:

  - Added the required column `num` to the `GradedExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `multi` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradedExam" ADD COLUMN     "num" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GradedProblem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "multi" BOOLEAN NOT NULL,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT;
