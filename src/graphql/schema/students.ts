import { gql } from 'apollo-server-express'

const typeDefsStudents = gql`
  type Query {
    students: [Student]
    myInformations(id: ID!): Student
  }

  type Student {
    id: String
    firstname: String
    lastname: String
    moods: [Mood]
    responsesToQuizzes: [ResponsesToQuiz]
  }

  type ResponsesToQuiz {
    id_quiz: String
    note: Int
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

  input inputResponsesToQuiz {
    id_quiz: String!
    note: Int!
  }

  type Mutation {
    updateMoodStudent(id: String, mood: inputMood): Student
    createStudent(firstname: String, lastname: String): Student
    createResponsesToQuizzes(id: ID, responses: inputResponsesToQuiz): Boolean
  }
`

export { typeDefsStudents as default }
