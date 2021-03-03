import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver/resolvers'

import typeDefsStudent from './graphql/schema/students'
import typeDefsTeachers from './graphql/schema/teachers'
import typeDefsUser from './graphql/schema/users'

const { getUserId } = require('./utils')

dotenv.config()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: [typeDefsStudent, typeDefsTeachers, typeDefsUser],
    resolvers
    // context: ({ req }) => {
    //   // Get the user token from the headers.
    //   const token = req.headers.authorization || ''
    //   // try to retrieve a user with the token
    //   const user = getUserId(token) // getUserId dans la config acutelle
    //   // optionally block the user
    //   // we could also check user roles/permissions here
    //   if (!user) throw new AuthenticationError('you must be logged in')

    //   return { user }
    // }
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
