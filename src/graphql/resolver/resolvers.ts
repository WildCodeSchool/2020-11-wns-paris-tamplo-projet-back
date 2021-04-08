import {
  getQuizzes,
  addQuiz,
  updateExistingQuiz,
  deleteOneQuiz
} from './utilsQuiz'
import {
  answerToQuiz,
  getUsers,
  getMyInfos,
  updateMood,
  registration,
  connection,
  oneUser
} from './utilsUser'

import { IAuthPayload, IQuiz, IResponseStatus, IUser } from '../../type'

const resolvers = {
  Query: {
    users: async (): Promise<IUser[]> => getUsers(),
    getOneUser: async (_: any, args: any): Promise<IUser> => oneUser(_, args),
    quizzes: async (): Promise<IQuiz[]> => getQuizzes(),
    myInformations: async (_: any, args: any): Promise<IUser> =>
      getMyInfos(_, args)
  },
  Mutation: {
    updateMoodStudent: async (_: any, args: any): Promise<IUser | null> =>
      updateMood(_, args),
    createResponsesToQuizzes: async (_: any, args: any): Promise<boolean> =>
      answerToQuiz(_, args),
    createQuiz: async (_: any, args: any): Promise<IQuiz> => addQuiz(_, args),
    updateQuiz: async (_: any, args: any): Promise<IQuiz | null> =>
      updateExistingQuiz(_, args),
    deleteQuiz: async (_: any, args: any): Promise<IQuiz | null> =>
      deleteOneQuiz(_, args),
    signup: async (_: any, args: any): Promise<IResponseStatus> =>
      registration(_, args),
    login: async (_: any, args: any): Promise<IAuthPayload> =>
      connection(_, args)
  }
}
export default resolvers
