const { gql, ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type Books {
    title: String
    author: String
  }

  type RegisterResponse {
    errors: [Error]
    user: User!
  }

  type User {
    id: ID
    username: String!
    email: String!
  }

  type Error {
    message: String
    code: Int
  }

  type Query {
    hi(message: String): String
    books: Books
  }

  input UserInput {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInput: UserInput!): RegisterResponse!
    login(userInput: UserInput!): String!
  }
`;

const resolvers = {
  User: {
    username: () => 'yello im username',
  },
  Query: {
    hi: (parent, { message }) => `Hello world!! ${message}`,
    books: () => ({
      title: 'Title one',
      author: 'Unknown author',
    }),
  },
  Mutation: {
    login: (parent, { userInput: { username, password, age } }, context, info) => {
      return username;
    },
    register: () => ({
      user: {
        username: 'test',
        email: 'test email',
      },
      errors: [
        {
          code: 413,
          message: 'This is a sample error',
        },
      ],
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => console.log(`Running at ${url}`));
