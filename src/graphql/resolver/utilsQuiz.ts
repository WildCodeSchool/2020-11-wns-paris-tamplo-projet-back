import { UserInputError, ApolloError } from 'apollo-server-express'
import QuizSchema from '../../models/quiz'

import { IQuestion, IResponse, IQuiz } from '../../types/quizzType'

export const getQuizzes = async (): Promise<IQuiz[]> => {
  try {
    return await QuizSchema.find()
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't get students.")
  }
}

export const addQuiz = async (_: any, args: any): Promise<IQuiz> => {
  const id = args?.id
  const quizPayload = args?.quiz?.questions?.responses?.resonse
  if (!id || !quizPayload) {
    throw new UserInputError(`Missing args`, {
      invalidArgs: [{ id, quizPayload }]
    })
  }
  const quizCred = {
    title: args?.quiz?.title,
    comment: args?.quiz?.comment,
    questions: args?.quiz?.questions?.map((quest: IQuestion) => {
      return {
        question: quest?.question,
        responses: quest?.responses?.map((res: IResponse) => {
          return {
            response: res?.response,
            isCorrect: res?.isCorrect
          }
        })
      }
    })
  }
  try {
    const quiz = new QuizSchema(quizCred)
    await quiz.save()
    return quiz
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't add quiz.")
  }
}

export const updateExistingQuiz = async (_: any, args: any): Promise<IQuiz> => {
  const id = args?.id
  const quizCred = args?.quiz
  if (!id || !quizCred) {
    throw new UserInputError(`Missing args`, {
      invalidArgs: [{ id, quizCred }]
    })
  }
  try {
    const quiz = await QuizSchema.findByIdAndUpdate(
      { _id: args.id },
      args.quiz,
      { new: true }
    )
    if (!quiz) {
      throw new ApolloError("This quiz doesn't exist.")
    }
    return quiz
  } catch (error) {
    console.error(error)
    throw new ApolloError(error.message || 'Can\t modify this quiz.')
  }
}

export const deleteOneQuiz = async (
  _: any,
  args: any
): Promise<number | undefined> => {
  const id = args?.id
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing quiz id`, {
      invalidArgs: [{ id }]
    })
  }
  try {
    const quiz = await QuizSchema.deleteOne({ _id: id })
    if (!quiz) {
      throw new ApolloError("This quiz doesn't exist.")
    }
    return quiz.n
  } catch (error) {
    console.error(error)
    throw new Error(error.message || "Can't delete this quiz.")
  }
}
