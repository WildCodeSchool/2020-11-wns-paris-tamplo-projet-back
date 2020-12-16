import studentSchema from '../../models/student'
import { IStudent } from '../../type'

const resolvers = {
  Query: {
    allStudents: async (): Promise<IStudent[] | undefined> => {
      try {
        const students = await studentSchema.find()
        console.log(students)
        return students
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default resolvers
