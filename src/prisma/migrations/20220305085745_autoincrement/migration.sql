-- AlterTable
CREATE SEQUENCE "gradedexam_num_seq";
ALTER TABLE "GradedExam" ALTER COLUMN "num" SET DEFAULT nextval('gradedexam_num_seq');
ALTER SEQUENCE "gradedexam_num_seq" OWNED BY "GradedExam"."num";
