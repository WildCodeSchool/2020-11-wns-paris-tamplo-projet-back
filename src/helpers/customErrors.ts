import { ApolloError } from 'apollo-server-errors'

export default class UnknownUserError extends ApolloError {
  constructor(message: string) {
    super(message, 'UNKNOWN_USER')

    Object.defineProperty(this, 'ErrorUserAuth', {
      value: 'Unkwown user'
    })
  }
}
