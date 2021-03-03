import { gql } from 'apollo-server-express'

const typeDefsUser = gql`
  type AuthPayload {
    token: String
    user: User
  }
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input inputSignUp {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  input inputLogin {
    email: String!
    password: String!
  }

  extend type Mutation {
    signup(user: inputSignUp): AuthPayload
    login(user: inputLogin): AuthPayload
  }
`

export { typeDefsUser as default }
