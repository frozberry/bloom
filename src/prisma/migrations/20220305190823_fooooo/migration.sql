/*
  Warnings:

  - Changed the type of `num` on the `GradedExam` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GradedExam" DROP COLUMN "num",
ADD COLUMN     "num" INTEGER NOT NULL;
