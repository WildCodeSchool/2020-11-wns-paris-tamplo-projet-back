import { Schema, model } from 'mongoose'
import { IStudent } from '../type'

const currentDate = () => {
  const today = new Date()
  return new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  ).toISOString()
}

const StudentSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  moods: [
    {
      note: { type: Number, required: true },
      comment: String,
      created_at: { type: String, required: true, default: currentDate }
    }
  ]
})

export default model<IStudent>('student', StudentSchema)
