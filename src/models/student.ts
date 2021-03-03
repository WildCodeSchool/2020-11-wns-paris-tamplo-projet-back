import { Schema, model } from 'mongoose'
import { IStudent } from '../type'
import currentDate from '../helpers/utils'

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
