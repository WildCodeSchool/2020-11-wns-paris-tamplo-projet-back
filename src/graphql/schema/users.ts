import { gql } from 'apollo-server-express'

const typeDefsUser = gql`
  enum Status {
    TEACHER
    STUDENT
  }

  type Query {
    users: [User]
    myInformations(id: ID!): User
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    status: Status
    moods: [Mood]
    responsesToQuizzes: [ResponsesToQuiz]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mood {
    note: Int
    comment: String
    created_at: String
  }

  type ResponsesToQuiz {
    id_quiz: String
    note: Int
  }

  input inputSignUp {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    status: Status
  }

  input inputLogin {
    email: String!
    password: String!
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
    signup(user: inputSignUp): AuthPayload
    login(user: inputLogin): AuthPayload
    updateMoodStudent(id: String, mood: inputMood): User
    createResponsesToQuizzes(id: ID, responses: inputResponsesToQuiz): Boolean
  }
`

export { typeDefsUser as default }
