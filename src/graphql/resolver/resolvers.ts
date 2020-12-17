import StudentSchema from '../../models/student'
import { IStudent } from '../../type'

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
    }
  }
}
export default resolvers
