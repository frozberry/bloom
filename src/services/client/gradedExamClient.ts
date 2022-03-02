import { GradedExam } from "@prisma/client"
import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"
import { ExamResultOverivew } from "../../lib/types"

const url = "/api/graded-exams"

export const findGradedExamById = async (id: string) => {
  const config = setAuthToken()

  const res = await axios.get<GradedExam>(`${url}/${id}`, config)
  return res.data
}

export const getExamResultsOverview = async () => {
  const config = setAuthToken()

  const res = await axios.get<ExamResultOverivew[]>(`${url}/overview`, config)
  return res.data
}
