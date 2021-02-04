import { Schema, model } from 'mongoose'
import { IQuiz } from '../type'

const currentDate = () => {
  const today = new Date()
  return new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  ).toISOString()
}

const QuizSchema = new Schema({
  title: { type: String, required: true },
  created_at: { type: String, required: true, default: currentDate },
  comment: { type: String },
  questions: [
    {
      question: { type: String, required: true },
      responses: [
        {
          response: { type: String, required: true },
          isCorrect: { type: Boolean, required: true }
        }
      ]
    }
  ]
})

export default model<IQuiz>('quiz', QuizSchema)
