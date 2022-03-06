import { Exam, ExamSession } from "@prisma/client"
import axios from "axios"

const url = "/api/exam-sessions"

export const findUsersExamSession = async () => {
  const response = await axios.get<ExamSession>(url)
  if (response.data) {
    const res = await axios.get<Exam>(`/api/exams/${response.data.examId}`)
    return res.data
  }

  return response.data
}

export const createExamSession = async (examId: string) => {
  const data = {
    examId,
  }

  const response = await axios.post<ExamSession>(url, data)
  return response.data
}
