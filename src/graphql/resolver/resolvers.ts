import StudentSchema from '../../models/student'
import QuizSchema from '../../models/quiz'
import { IStudent, IQuiz, IQuestion, IResponse } from '../../type'

const resolvers = {
  Query: {
    students: async (): Promise<IStudent[]> => {
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
    }
  }
}
export default resolvers
