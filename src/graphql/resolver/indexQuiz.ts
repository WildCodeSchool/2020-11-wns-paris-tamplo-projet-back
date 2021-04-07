import QuizSchema from '../../models/quiz'
import UserSchema from '../../models/user'

import { IQuiz, IQuestion, IResponse, IUser } from '../../type'

export const getQuizzes = async () => {
  try {
    return await QuizSchema.find()
  } catch (error) {
    throw new Error('Impossible de récupérer les quizzes, problème server.')
  }
}

export const answerToQuiz = async (_: any, args: any) => {
  try {
    const user = await UserSchema.findOne({ _id: args.id })
    const info = {
      id_quiz: args.responses.id_quiz,
      note: args.responses.note
    }
    user?.responsesToQuizzes.push(info)
    user?.save()
    return true
  } catch (error) {
    throw new Error("Impossible d'ajouter une note à ce quiz.")
  }
}

export const createQuiz = async (_: any, args: any) => {
  try {
    const quiz = await new QuizSchema({
      title: args.quiz.title,
      comment: args.quiz.comment,
      questions: args.quiz.questions.map((quest: IQuestion) => {
        return {
          question: quest.question,
          responses: quest.responses.map((res: IResponse) => {
            return {
              response: res.response,
              isCorrect: res.isCorrect
            }
          })
        }
      })
    })
    await quiz.save()
    return quiz
  } catch (error) {
    console.error(error)
    throw new Error("Impossible d'ajouter un quiz, essayez plus tard.")
  }
}