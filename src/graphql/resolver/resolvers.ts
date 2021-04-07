import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import QuizSchema from '../../models/quiz'
import UserSchema from '../../models/user'

import { IQuiz, IQuestion, IResponse, IUser } from '../../type'

import { JWT_SECRET } from '../../utils'

const resolvers = {
  Query: {
    users: async (): Promise<IUser[]> => {
      try {
        return await UserSchema.find()
      } catch (error) {
        throw new Error(
          'Impossible de récupérer les étudiants, problème server.'
        )
      }
    },
    quizzes: async (): Promise<IQuiz[]> => {
      try {
        return await QuizSchema.find()
      } catch (error) {
        throw new Error('Impossible de récupérer les quizzes, problème server.')
      }
    },
    myInformations: async (_: any, args: any): Promise<IUser> => {
      try {
        const user = await UserSchema.findOne({ _id: args.id })
        if (!user) {
          throw new Error("Cette personne n'existe pas")
        }
        return user
      } catch (error) {
        throw new Error(
          'Impossible de récupérer les infos personnelles, problème server.'
        )
      }
    }
  },
  Mutation: {
    updateMoodStudent: async (_: any, args: any): Promise<IUser | null> => {
      try {
        const user = await UserSchema.findOne({ _id: args.id })
        user?.moods.push(args.mood)
        user?.save()
        return user
      } catch (error) {
        throw new Error("Impossible d'ajouter un mood.")
      }
    },
    createResponsesToQuizzes: async (_: any, args: any): Promise<boolean> => {
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
    },
    createQuiz: async (_: any, args: any): Promise<IQuiz> => {
      try {
        const quiz = new QuizSchema({
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
    },
    updateQuiz: async (_: any, args: any): Promise<IQuiz | null> => {
      try {
        const quiz = await QuizSchema.findByIdAndUpdate(
          { _id: args.id },
          args.quiz
        )
        return quiz
      } catch (error) {
        console.error(error)
        throw new Error("Impossible de modifier ce quiz pour l'instant.")
      }
    },
    deleteQuiz: async (_: any, args: any): Promise<IQuiz | null> => {
      try {
        const quiz = await QuizSchema.deleteOne({ _id: args.id })
        return quiz.n
      } catch (error) {
        console.error(error)
        throw new Error("Impossible de supprimer ce quiz pour l'instant.")
      }
    },
    signup: async (_: any, args: any) => {
      const password = await bcrypt.hash(args.user.password, 10)
      try {
        const user = new UserSchema({
          ...args.user,
          password
        })
        await user.save()
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: '1d'
        })
        return {
          token,
          user
        }
      } catch (error) {
        console.error(error)
        throw new Error("Impossible d'ajouter un étudiant.")
      }
    },
    login: async (_: any, args: any) => {
      const user = await UserSchema.findOne({ email: args.user.email })
      if (!user) {
        throw new Error('No such user found')
      }
      const valid = await bcrypt.compare(args.user.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1d'
      })
      return {
        token,
        user
      }
    }
  }
}
export default resolvers
