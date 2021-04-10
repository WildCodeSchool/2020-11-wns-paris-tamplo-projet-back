import { PubSub } from "apollo-server";
const pubsub = new PubSub();

// Utils Resolver
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
  oneUser,
  modifyOneUser,
  deleteOneUser
} from './utilsUser'
import {
  getRessources,
  addRessource,
  updateExistingRessource,
  deleteOneRessource
} from './utilsRessources'

// Types
import { IQuiz } from '../../types/quizzType'
import { IUser, IAuthPayload, IResponseStatus } from '../../types/userType'
import { IRessource } from '../../types/ressourceType'

const resolvers = {
  Query: {
    // User
    users: async (): Promise<IUser[]> => getUsers(),
    getOneUser: async (_: any, args: any): Promise<IUser> => oneUser(_, args),
    myInformations: async (_: any, args: any, context: any): Promise<IUser> =>
      getMyInfos(_, args, context),

    // Quiz
    quizzes: async (): Promise<IQuiz[]> => getQuizzes(),

    // Ressource
    ressources: async (): Promise<IRessource[]> => getRessources()
  },
  Mutation: {
    // User
    updateMoodStudent: async (_: any, args: any): Promise<IUser | null> =>
      updateMood(_, args),
    createResponsesToQuizzes: async (_: any, args: any): Promise<boolean> =>
      answerToQuiz(_, args),
    signup: async (_: any, args: any): Promise<IResponseStatus> =>
      registration(_, args),
    login: async (_: any, args: any): Promise<IAuthPayload> =>
      connection(_, args),
    updateOneUser: async (_: any, args: any): Promise<IUser> =>
      modifyOneUser(_, args),
    deleteUser: async (_: any, args: any): Promise<IUser> =>
      deleteOneUser(_, args),

    // Quiz
    createQuiz: async (_: any, args: any): Promise<IQuiz> => addQuiz(_, args),
    updateQuiz: async (_: any, args: any): Promise<IQuiz> =>
      updateExistingQuiz(_, args),
    deleteQuiz: async (_: any, args: any): Promise<IQuiz> =>
      deleteOneQuiz(_, args),

    // Ressource
    createRessource: async (_: any, args: any): Promise<IRessource> =>
      addRessource(_, args),
    updateRessource: async (_: any, args: any): Promise<IRessource> =>
      updateExistingRessource(_, args),
    deleteRessource: async (_: any, args: any): Promise<IRessource> =>
      deleteOneRessource(_, args),

    // Chat
    createMessage: (parent: any, args: any, context: any) => {
      pubsub.publish("POST_CREATED", { messageCreated: args.input });
      return {
        author: {
          firstname: args.input.author.firstname,
          lastname: args.input.author.lastname,
        },
        message: args.input.message,
        created_at: new Date().toISOString(),
      };
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  }
}
export default resolvers
