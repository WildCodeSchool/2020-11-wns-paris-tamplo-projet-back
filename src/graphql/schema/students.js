import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    allStudents: [Student]
  }

  type Student {
    id: ID!
    firstname: String
    lastname: String
    mood: [Mood]
  }

  type Mood {
    id: ID!
    note: Int
    comment: String
    created_at: String
  }

  input MoodInput {
    note: Int!
    comment: String
  }

  type Mutation {
    createMood(mood: MoodInput): Mood
  }
`

export { typeDefs as default }
