import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    allStudents: [Student]
  }

  type Student {
    id: ID!
    firstname: String
    lastname: String
  }
`
export { typeDefs as default }
