import { Schema, model } from 'mongoose'
import { IQuiz } from '../type'
import currentDate from '../helpers/utils'

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
