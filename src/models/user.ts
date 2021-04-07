import { Schema, model } from 'mongoose'
import { IUser } from '../type'
import currentDate from '../helpers/utils'

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['STUDENT', 'TEACHER'], required: true },
  moods: [
    {
      note: { type: Number, required: true },
      comment: String,
      created_at: { type: String, required: true, default: currentDate }
    }
  ],
  responsesToQuizzes: [
    {
      id_quiz: String,
      note: Number
    }
  ]
})

export default model<IUser>('user', UserSchema)
