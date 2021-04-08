import QuizSchema from '../../models/quiz'

import { IQuestion, IResponse, IQuiz } from '../../types/quizzType'

export const getQuizzes = async (): Promise<IQuiz[]> => {
  try {
    return await QuizSchema.find()
  } catch (error) {
    throw new Error('Impossible de récupérer les quizzes, problème server.')
  }
}

export const addQuiz = async (_: any, args: any): Promise<IQuiz> => {
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

export const updateExistingQuiz = async (_: any, args: any): Promise<IQuiz> => {
  try {
    const quiz = await QuizSchema.findByIdAndUpdate({ _id: args.id }, args.quiz)
    if (!quiz) {
      throw new Error("Ce quiz n'existe pas !")
    }
    return quiz
  } catch (error) {
    console.error(error)
    throw new Error("Impossible de modifier ce quiz pour l'instant.")
  }
}

export const deleteOneQuiz = async (_: any, args: any): Promise<IQuiz> => {
  try {
    const quiz = await QuizSchema.deleteOne({ _id: args.id })
    if (!quiz) {
      throw new Error("Ce quiz n'existe pas !")
    }
    return quiz.n
  } catch (error) {
    console.error(error)
    throw new Error("Impossible de supprimer ce quiz pour l'instant.")
  }
}
