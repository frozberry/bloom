-- AlterTable
CREATE SEQUENCE "exam_num_seq";
ALTER TABLE "Exam" ALTER COLUMN "num" SET DEFAULT nextval('exam_num_seq');
ALTER SEQUENCE "exam_num_seq" OWNED BY "Exam"."num";

-- AlterTable
ALTER TABLE "GradedExam" ALTER COLUMN "num" DROP DEFAULT;
DROP SEQUENCE "gradedexam_num_seq";
