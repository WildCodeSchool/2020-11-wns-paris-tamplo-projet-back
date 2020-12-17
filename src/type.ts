import { Document } from 'mongoose'

export interface IMood {
  note: number
  comment: string
  created_at: string
}

export interface IStudent extends Document {
  _id: string
  firstname: string
  lastname: string
  moods: IMood[]
}