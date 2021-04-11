export const sendMessage = (_: any, args: any, pubsub: any) => {
  pubsub.publish('POST_CREATED', { messageCreated: args.input })
  return {
    author: {
      firstname: args.input.author.firstname,
      lastname: args.input.author.lastname
    },
    message: args.input.message,
    created_at: new Date().toISOString()
  }
}
