import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  UserInputError,
  ApolloError,
  AuthenticationError
} from 'apollo-server-express'
import UnknownUserError from '../../helpers/customErrors'
import {
  IAuthPayload,
  IResponseStatus,
  IUserCredentials,
  IUserRegistration,
  IUser
} from '../../types/userType'

import UserSchema from '../../models/user'

import { JWT_SECRET } from '../../utils'

export const answerToQuiz = async (_: any, args: any): Promise<boolean> => {
  const id = args?.id
  const responses = args?.responses
  if (!id) {
    throw new UserInputError(`Missing args.`, {
      invalidArgs: [{ id, responses }]
    })
  }
  const info = {
    id_quiz: args?.responses?.id_quiz,
    note: args?.responses?.note
  }
  try {
    const user = await UserSchema.findOne({ _id: id })
    if (!user) throw new UnknownUserError(`UnknownUserError: Can't find user`)

    user?.responsesToQuizzes.push(info)
    user?.save()
    return true
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't add rate on quizz.")
  }
}

export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await UserSchema.find()
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't get students.")
  }
}

export const getMyInfos = async (
  _: any,
  args: any,
  context: any
): Promise<IUser> => {
  const id = context?.user?.id
  if (!id || id.length === 0) {
    throw new AuthenticationError(`Missing user id in server context`)
  }
  try {
    const user = await UserSchema.findOne({ _id: id })
    if (!user) {
      throw new UnknownUserError(
        `UnknownUserError: Can't find user with id ${id}.`
      )
    }

    return user
  } catch (error) {
    console.error(error)
    throw new ApolloError('Can get user personal info')
  }
}

export const updateMood = async (_: any, args: any): Promise<IUser> => {
  const id = args?.id
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing user id`, {
      invalidArgs: [{ id }]
    })
  }
  try {
    const user = await UserSchema.findOne({ _id: id })
    if (!user)
      throw new UnknownUserError(
        `UnknownUserError: Can't find user  with id ${id}`
      )

    user.moods.push(args?.mood)
    user.save()
    return user
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't add mood.")
  }
}

export const tokenIsValid = async (): Promise<true> => true

export const registration = async (
  _: any,
  { user }: { user: IUserRegistration }
): Promise<IResponseStatus> => {
  if (!user) {
    throw new UserInputError(`Missing user credential.`, {
      invalidArgs: [{ user }]
    })
  }
  try {
    const password = await bcrypt.hash(user?.password, 10)
    const newUser = new UserSchema({
      ...user,
      password
    })
    if (!newUser) throw new ApolloError('Error on creating new user.')

    await newUser.save()
    return {
      success: true,
      message: `${user.firstname} ${user.lastname} a été rajouté (${
        user.status === 'STUDENT' ? 'Etudiant' : 'Formateur'
      })`
    }
  } catch (error) {
    console.error(error)
    throw new ApolloError(error.message || "Can't add student.")
  }
}

export const connection = async (
  _: any,
  { userCredentials }: { userCredentials: IUserCredentials }
): Promise<IAuthPayload> => {
  if (!userCredentials) {
    throw new UserInputError(`Missing user credential.`, {
      invalidArgs: [{ userCredentials }]
    })
  }
  const user = await UserSchema.findOne({ email: userCredentials?.email })
  if (!user) {
    throw new AuthenticationError('Authentification Error: No such user found')
  }
  const valid = await bcrypt.compare(userCredentials?.password, user?.password)
  if (!valid) {
    throw new AuthenticationError('Authentification Error: Invalid password')
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
  const id = args?.id
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing user id`, {
      invalidArgs: [{ id }]
    })
  }
  try {
    const user = await UserSchema.findOne({ _id: id })
    if (!user) {
      throw new UnknownUserError(
        `UnknownUserError: Can't find user with id ${id}`
      )
    }

    return user
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't get this user.")
  }
}

export const modifyOneUser = async (_: any, args: any): Promise<IUser> => {
  const id = args?.id
  const userCred = args?.user
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing user id`, {
      invalidArgs: [{ id, userCred }]
    })
  }
  try {
    const user = await UserSchema.findByIdAndUpdate({ _id: id }, userCred, {
      new: true
    })
    if (!user) {
      throw new UnknownUserError(
        `UnknownUserError: Can't find user with id ${id}`
      )
    }

    return user
  } catch (error) {
    console.error(error)
    throw new ApolloError('Can\t modify this user.')
  }
}

export const deleteOneUser = async (
  _: any,
  args: any
): Promise<number | undefined> => {
  const id = args?.id
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing user id`, {
      invalidArgs: [{ id }]
    })
  }
  try {
    const user = await UserSchema.deleteOne({ _id: id })
    if (!user) throw new UnknownUserError(`UnknownUserError: Can't find user.`)

    return user.n
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't delete this user.")
  }
}
