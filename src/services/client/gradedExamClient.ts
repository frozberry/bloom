import { GradedExam } from "@prisma/client"
import axios from "axios"
import { ExamResultOverivew } from "../../lib/types"

const url = "/api/graded-exams"

export const findGradedExamById = async (id: string) => {
  const res = await axios.get<GradedExam>(`${url}/${id}`)
  return res.data
}

export const getExamResultsOverview = async () => {
  const res = await axios.get<ExamResultOverivew[]>(`${url}/overview`)
  return res.data
}
