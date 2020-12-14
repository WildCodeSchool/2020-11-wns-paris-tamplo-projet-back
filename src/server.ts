import { ApolloServer } from 'apollo-server'
import { getAll } from './graphql/query'

import schema from './graphql/schema.students'

const resolvers = {
  Query: {
    allStudents: async () => getAll('nameTableToDefineHere')
  }
}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
