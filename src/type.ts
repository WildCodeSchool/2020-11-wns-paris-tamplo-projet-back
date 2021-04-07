import { Document } from 'mongoose'

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

export interface IUser extends Document {
  _id: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface IStudent extends IUser {
  moods: IMood[]
  responsesToQuizzes: IResponsesToQuiz[]
}
