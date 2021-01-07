import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver/resolvers'

import schema from './graphql/schema/students'

dotenv.config()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers
  })

  await mongoose
    .connect(`mongodb://mongodb:27017/${process.env.DB_DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true
    })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

startServer()
