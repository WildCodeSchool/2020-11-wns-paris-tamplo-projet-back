import { ApolloServer } from 'apollo-server'
import resolvers from './graphql/resolver/resolvers'

import schema from './graphql/schema/students'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
