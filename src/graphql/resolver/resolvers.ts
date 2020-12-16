import studentSchema from '../../models/student'
import { IStudent } from '../../type'

const resolvers = {
  Query: {
    allStudents: async (): Promise<IStudent[]> => {
      try {
        return await studentSchema.find()
      } catch (error) {
        throw new Error(
          'Impossible de récupérer les étudiants, problème server.'
        )
      }
    }
  }
}

export default resolvers
