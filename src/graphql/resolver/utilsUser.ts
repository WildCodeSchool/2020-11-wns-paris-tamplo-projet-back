import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  IAuthPayload,
  IResponseStatus,
  IUserCredentials,
  IUserRegistration
} from '../../type'
import UserSchema from '../../models/user'

import { IQuiz, IUser } from '../../type'

import { JWT_SECRET } from '../../utils'

export const answerToQuiz = async (_: any, args: any): Promise<boolean> => {
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

export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await UserSchema.find()
  } catch (error) {
    throw new Error('Impossible de récupérer les étudiants, problème server.')
  }
}

export const getMyInfos = async (_: any, args: any): Promise<IUser> => {
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

export const updateMood = async (_: any, args: any): Promise<IUser> => {
  try {
    const user = await UserSchema.findOne({ _id: args.id })
    if (!user) {
      throw new Error("Cette personne n'existe pas")
    }
    user.moods.push(args.mood)
    user.save()
    return user
  } catch (error) {
    throw new Error("Impossible d'ajouter un mood.")
  }
}

export const registration = async (
  _: any,
  { user }: { user: IUserRegistration }
): Promise<IResponseStatus> => {
  const password = await bcrypt.hash(user.password, 10)
  try {
    const newUser = new UserSchema({
      ...user,
      password
    })
    await newUser.save()
    return {
      success: true,
      message: `${user.firstname} ${user.lastname} a été rajouté (${
        user.status === 'STUDENT' ? 'Etudiant' : 'Formateur'
      })`
    }
  } catch (error) {
    console.error(error)
    throw new Error("Impossible d'ajouter un étudiant.")
  }
}

export const connection = async (
  _: any,
  { userCredentials }: { userCredentials: IUserCredentials }
): Promise<IAuthPayload> => {
  const user = await UserSchema.findOne({ email: userCredentials.email })
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(userCredentials.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ id: user.id, status: user.status }, JWT_SECRET, {
    expiresIn: '1d'
  })
  return {
    token,
    user
  }
}

export const oneUser = async (_: any, args: any): Promise<IUser> => {
  try {
    const user = await UserSchema.findOne({ _id: args.id })
    if (!user) {
      throw new Error("Cet utilisateur n'existe pas")
    }
    return user
  } catch (error) {
    throw new Error('Impossible de retrouver cet utilisateur !')
  }
}

export const modifyOneUser = async (_: any, args: any): Promise<IUser> => {
  try {
    const user = await UserSchema.findByIdAndUpdate({ _id: args.id }, args.user)
    if (!user) {
      throw new Error("Cette personne n'existe pas")
    }
    return user
  } catch (error) {
    throw new Error('Impossible de modifier cet utilisateur.')
  }
}

export const deleteOneUser = async (_: any, args: any): Promise<IUser> => {
  try {
    const user = await UserSchema.deleteOne({ _id: args.id })
    if (!user) {
      throw new Error("Cet utilisateur n'existe pas !")
    }
    return user.n
  } catch (error) {
    console.error(error)
    throw new Error("Impossible de supprimer cet utilisateur pour l'instant.")
  }
}
