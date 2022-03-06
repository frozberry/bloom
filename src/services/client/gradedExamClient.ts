import { GradedExam } from "@prisma/client"
import axios from "axios"
import { ExamResultOverivew, ProblemSubmission } from "../../lib/types"

const url = "/api/graded-exams"

export const getUsersGradedExams = async () => {
  const res = await axios.get<GradedExam[]>(url)
  return res.data
}

export const findGradedExamById = async (id: string) => {
  const res = await axios.get<GradedExam>(`${url}/${id}`)
  return res.data
}

export const getExamResultsOverview = async () => {
  const res = await axios.get<ExamResultOverivew[]>(`${url}/overview`)
  return res.data
}

export const submitExam = async (
  examSessionId: string,
  submissions: ProblemSubmission[]
) => {
  const data = { examSessionId, submissions }
  const res = await axios.post(url, data)
  return res.data
}
