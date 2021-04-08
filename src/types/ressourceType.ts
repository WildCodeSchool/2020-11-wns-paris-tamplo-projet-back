import { Document } from 'mongoose'

export interface IRessource extends Document {
  _id: string
  title: string
  comment: string
  url: string
  tags: string[]
}
