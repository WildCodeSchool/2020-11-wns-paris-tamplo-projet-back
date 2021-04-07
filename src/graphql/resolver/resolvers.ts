import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../../models/user'

import { getQuizzes, addQuiz, updateExistingQuiz, deleteOneQuiz } from './utilsQuiz'
import { answerToQuiz } from './utilsUser'

import { IQuiz, IUser } from '../../type'

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
    quizzes: async (): Promise<IQuiz[]> => await getQuizzes(),
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
    createResponsesToQuizzes: async (_: any, args: any): Promise<boolean> => await answerToQuiz(_, args),
    createQuiz: async (_: any, args: any): Promise<IQuiz> => await addQuiz(_, args),
    updateQuiz: async (_: any, args: any): Promise<IQuiz | null> => updateExistingQuiz(_, args),
    deleteQuiz: async (_: any, args: any): Promise<IQuiz | null> => deleteOneQuiz(_, args),
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
