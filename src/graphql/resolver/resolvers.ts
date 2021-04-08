import { getQuizzes, addQuiz, updateExistingQuiz, deleteOneQuiz } from './utilsQuiz'
import { answerToQuiz, getUsers, getMyInfos, updateMood, registration, connection } from './utilsUser'

import { IQuiz, IUser } from '../../type'

const resolvers = {
  Query: {
    users: async (): Promise<IUser[]> => await getUsers(),
    quizzes: async (): Promise<IQuiz[]> => await getQuizzes(),
    myInformations: async (_: any, args: any): Promise<IUser> => await getMyInfos(_, args),
  },
  Mutation: {
    updateMoodStudent: async (_: any, args: any): Promise<IUser | null> => await updateMood(_, args),
    createResponsesToQuizzes: async (_: any, args: any): Promise<boolean> => await answerToQuiz(_, args),
    createQuiz: async (_: any, args: any): Promise<IQuiz> => await addQuiz(_, args),
    updateQuiz: async (_: any, args: any): Promise<IQuiz | null> => await updateExistingQuiz(_, args),
    deleteQuiz: async (_: any, args: any): Promise<IQuiz | null> => await deleteOneQuiz(_, args),
    signup: async (_: any, args: any) => await registration(_, args),
    login: async (_: any, args: any) => await connection(_, args)
  }
}
export default resolvers
