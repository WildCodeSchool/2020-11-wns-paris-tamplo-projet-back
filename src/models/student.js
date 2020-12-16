import { Schema, model } from 'mongoose'

const studentSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },
  moods: [
    // moods: ObjectID -> moods
    {
      note: Number,
      comment: String,
      created_at: { type: Date, required: true, default: Date.now }
    }
  ]
})

export default model('Student', studentSchema)
