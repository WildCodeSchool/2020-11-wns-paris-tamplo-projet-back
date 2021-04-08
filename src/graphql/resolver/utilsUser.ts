import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from '../../models/user'

import { JWT_SECRET } from '../../utils'

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

export const getUsers = async () => {
  try {
    return await UserSchema.find()
  } catch (error) {
    throw new Error(
      'Impossible de récupérer les étudiants, problème server.'
    )
  }
}

export const getMyInfos = async (_: any, args: any) => {
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

export const updateMood = async (_: any, args: any) => {
  try {
    const user = await UserSchema.findOne({ _id: args.id })
    user?.moods.push(args.mood)
    user?.save()
    return user
  } catch (error) {
    throw new Error("Impossible d'ajouter un mood.")
  }
}

export const registration = async (_: any, args: any) => {
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
}

export const connection = async (_: any, args: any) => {
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