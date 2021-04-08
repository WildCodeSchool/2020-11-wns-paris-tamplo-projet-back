import { Schema, model } from 'mongoose'
import { IUser } from '../type'

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true }
})

export default model<IUser>('user', UserSchema)
