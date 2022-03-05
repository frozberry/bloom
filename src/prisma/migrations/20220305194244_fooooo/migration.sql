/*
  Warnings:

  - Added the required column `num` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradedProblem" ADD COLUMN     "num" INTEGER NOT NULL;
