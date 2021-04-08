import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import QuizSchema from '../../models/quiz'
import StudentSchema from '../../models/student'
import UserSchema from '../../models/user'

import { IStudent, IQuiz, IQuestion, IResponse, IUser } from '../../type'

import { JWT_SECRET } from '../../utils'

const resolvers = {
  Query: {
    students: async (parent, args, context): Promise<IStudent[]> => {
      try {
        return await StudentSchema.find()
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
    }
  },
  Mutation: {
    updateMoodStudent: async (_: any, args: any): Promise<IStudent | null> => {
      try {
        const student = await StudentSchema.findOne({ _id: args.id })
        student?.moods.push(args.mood)
        student?.save()
        return student
      } catch (error) {
        throw new Error("Impossible d'ajouter un mood.")
      }
    },
    createStudent: async (_: any, args: any): Promise<IStudent> => {
      try {
        const student = new StudentSchema({
          firstname: args.firstname,
          lastname: args.lastname
        })
        await student.save()
        return student
      } catch (error) {
        console.error(error)
        throw new Error("Impossible d'ajouter un étudiant.")
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
    signup: async (
      _: any,
      { user }: { user: IUser }
    ): Promise<{ success: boolean; message: string }> => {
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
            user.status === 'student' ? 'Etudiant' : 'Formateur'
          })`
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
      const token = jwt.sign({ id: user.id, status: user.status }, JWT_SECRET, {
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
