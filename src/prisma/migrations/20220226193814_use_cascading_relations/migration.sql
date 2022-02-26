-- DropForeignKey
ALTER TABLE "ExamSession" DROP CONSTRAINT "ExamSession_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSession" DROP CONSTRAINT "ExamSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "GradedCategory" DROP CONSTRAINT "GradedCategory_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "GradedCategory" DROP CONSTRAINT "GradedCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "GradedExam" DROP CONSTRAINT "GradedExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "GradedExam" DROP CONSTRAINT "GradedExam_userId_fkey";

-- DropForeignKey
ALTER TABLE "GradedProblem" DROP CONSTRAINT "GradedProblem_gradedExamId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_examId_fkey";

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

-- AddForeignKey
ALTER TABLE "GradedCategory" ADD CONSTRAINT "GradedCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
