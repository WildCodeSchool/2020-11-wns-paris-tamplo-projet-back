import { Document } from 'mongoose'

export interface IResponseStatus {
  success: boolean
  message: string
}

export interface IAuthPayload {
  token: string
  user: IUser
}

export interface IMood {
  note: number
  comment: string
  created_at: string
}

export interface IQuestion {
  question: string
  responses: IResponse[]
}

export interface IResponse {
  response: string
  isCorrect: boolean
}

export interface IResponsesToQuiz {
  id_quiz: string
  note: number
}

export interface IQuiz extends Document {
  _id: string
  title: string
  comment: string
  created_at: string
  questions: IQuestion[]
}

export interface IUserCredentials {
  email: string
  password: string
}

export interface IUserRegistration extends IUserCredentials {
  firstname: string
  lastname: string
  status: 'STUDENT' | 'TEACHER'
}

export interface IUser extends IUserRegistration, Document {
  _id: string
  moods: IMood[]
  responsesToQuizzes: IResponsesToQuiz[]
}
