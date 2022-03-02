import { GradedExam } from "@prisma/client"
import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/graded-exams"

export const findGradedExamById = async (id: string) => {
  const config = setAuthToken()

  const res = await axios.get<GradedExam>(`${url}/${id}`, config)
  return res.data
}

export const getSortedExams = async () => {
  const config = setAuthToken()

  const res = await axios.get(`${url}/test-sorted`, config)
  return res.data
}
