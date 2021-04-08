import { gql } from 'apollo-server-express'

const typeDefsUser = gql`
  enum Status {
    TEACHER
    STUDENT
  }

  type Query {
    users: [User]
    getOneUser(id: ID!): User
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

  type ResponseStatus {
    success: Boolean
    message: String
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

  input userCredentials {
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
    signup(user: inputSignUp): ResponseStatus
    login(userCredentials: userCredentials): AuthPayload
    updateMoodStudent(id: String, mood: inputMood): User
    createResponsesToQuizzes(id: ID, responses: inputResponsesToQuiz): Boolean
    updateOneUser(id: String, user: inputSignUp): User
    deleteUser(id: String): Int
  }
`

export { typeDefsUser as default }
