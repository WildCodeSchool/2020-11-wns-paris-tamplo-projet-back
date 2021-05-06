import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver/resolvers'

import typeDefsQuizzes from './graphql/schema/quizzes'
import typeDefsUser from './graphql/schema/users'
import typeDefsRessources from './graphql/schema/ressources'

import { getUserData } from './utils'

dotenv.config()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: [typeDefsQuizzes, typeDefsUser, typeDefsRessources],
    resolvers,
    context: ({ req }) => {
      const { operationName } = req.body
      // IntrospectionQuery is to allow Audrey to use the GQL playground (at start without authorization)
      if (operationName === 'login' || operationName === 'IntrospectionQuery') {
        return {}
      }

      // try to retrieve a user data from authorization in the header
      // and store information (id, status) in the context
      const user = getUserData(req)
      return { user }
    }
  })

  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true
      }
    )
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))

  server.listen({ port: process.env.API_URL }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url} ! Houra !`)
  })
}

startServer()
