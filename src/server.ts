import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver/resolvers'

import schema from './graphql/schema/students'

dotenv.config()

// Connect to database
mongoose
  .connect(`mongodb://mongodb:27017/${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err))

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
