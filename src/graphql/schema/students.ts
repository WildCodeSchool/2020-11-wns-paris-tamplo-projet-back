import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    students: [Student]
  }

  type Student {
    id: String
    firstname: String
    lastname: String
    moods: [Mood]
  }

  type Mood {
    note: Int
    comment: String
    created_at: String
  }

  input inputMood {
    note: Int
    comment: String
    created_at: String
  }

  type Mutation {
    updateMoodStudent(id: String, mood: inputMood): Student
    createStudent(firstname: String, lastname: String): Student
  }
`

export { typeDefs as default }
