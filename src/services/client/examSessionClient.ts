import { Exam, ExamSession } from "@prisma/client"
import axios from "axios"

const url = "/api/exam-sessions"

export const findUsersExamSession = async () => {
  const response = await axios.get<ExamSession>(url)
  return response.data
}

export const createExamSession = async (examId: string) => {
  const data = {
    examId,
  }

  const response = await axios.post<ExamSession>(url, data)
  return response.data
}

export const findActiveExam = async () => {
  const session = await findUsersExamSession()

  if (session) {
    const res = await axios.get<Exam>(`/api/exams/${session.examId}`)
    return res.data
  }

  return null
}
