import { Schema, model } from 'mongoose'
import { IStudent } from '../type'

const studentSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String }
})

export default model<IStudent>('student', studentSchema)
