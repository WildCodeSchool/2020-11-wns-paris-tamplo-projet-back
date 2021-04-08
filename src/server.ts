import { ApolloServer, AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver/resolvers'

import typeDefsStudent from './graphql/schema/students'
import typeDefsTeachers from './graphql/schema/teachers'
import typeDefsUser from './graphql/schema/users'

import { getUserData } from './utils'

dotenv.config()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: [typeDefsStudent, typeDefsTeachers, typeDefsUser],
    resolvers,
    context: ({ req }) => {
      // const { parse } = require('graphql');
      // console.log('name', obj.definitions[0].selectionSet.selections[0].name.value);
      const { operationName } = req.body

      if (operationName === 'login') {
        return {}
      }

      // try to retrieve a user data from authorization in the header
      const userData = getUserData(req)

      // if (!userData) throw new AuthenticationError('you must be logged in')

      return userData
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

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

startServer()
