import { gql } from 'apollo-server-express'

const typeDefsChat = gql`
  extend type Query {
    getMessages: [Message]
  }

  type Subscription {
    messageCreated: Message
  }

  type Message {
    id: ID
    author: Name
    message: String
    created_at: String
  }

  type Name {
    firstname: String
    lastname: String
  }

  input inputName {
    firstname: String
    lastname: String
  }

  input inputMessage {
    author: inputName!
    message: String!
    created_at: String
  }

  extend type Mutation {
    createMessage(input: inputMessage): Message
  }
`

export { typeDefsChat as default }
