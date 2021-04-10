const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "server-tamplo",
      url: "http://localhost:4000/graphql",
    },
    // { name: "chat", url: "http://localhost:4001/graphql" },
  ],
});

(async () => {
  const server = new ApolloServer({
    gateway,
    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
