import getAll from '../utils'

const resolvers = {
  Query: {
    allStudents: async (): Promise<void> => getAll('nameTableToDefineHere')
  }
}

export default resolvers
