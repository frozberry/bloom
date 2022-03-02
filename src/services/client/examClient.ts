import { Exam } from "@prisma/client"
import axios from "axios"
import setAuthToken from "../../lib/setAuthToken"

const url = "/api/exams"

export const getExams = async () => {
  const response = await axios.get<Exam[]>(url)
  return response.data
}

export const findExamById = async (id: string) => {
  const response = await axios.get<Exam>(`${url}/${id}`)
  return response.data
}

export const getNextExam = async () => {
  const config = setAuthToken()

  // I think this is being returned as an empty string instead of null
  const response = await axios.get<Exam | null>(`${url}/next`, config)
  return response.data
}
