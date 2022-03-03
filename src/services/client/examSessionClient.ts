import { ExamSession } from "@prisma/client"
import axios from "axios"

const url = "/api/exam-sessions"

export const findUsersExamSession = async () => {
  const response = await axios.get<ExamSession>(url)
  return response.data
}

export const createTestSession = async (examId: string) => {
  const data = {
    examId,
  }

  const response = await axios.post<ExamSession>(url, data)
  return response.data
}
