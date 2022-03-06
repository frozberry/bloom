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
  const examSession = await findUsersExamSession()

  if (examSession) {
    const res = await axios.get<Exam>(`/api/exams/${examSession.examId}`)

    return {
      examSession,
      exam: res.data,
    }
  }

  return null
}

export const deleteExamSession = async () => {
  const res = await axios.delete(url)
  return res.data
}
