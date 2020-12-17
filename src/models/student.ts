import { Schema, model } from 'mongoose'
import { IStudent } from '../type'

const StudentSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  moods: [
    {
      note: Number,
      comment: String,
      created_at: { type: Date, required: true, default: Date.now }
    }
  ]
})

export default model<IStudent>('student', StudentSchema)
