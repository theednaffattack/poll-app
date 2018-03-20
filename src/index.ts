import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { ResolverMap } from "../types/ResolverType";

const typeDefs = `
  type User {
    id: Int!
    age: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!, email: String!): User!
    updateUser(firstName: String, lastName: String, age: Int, email: String): Boolean
    deleteUser(id: Int!): Boolean
  }
`;

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => `hello ${name || "World"}`,
    user: (_, {id}) => User.findOneById(id),
    users: () => User.find(),
  },
  Mutation: {
    createUser: (_, args) => User.create(args).save(),
    updateUser: (_, {id, ...args}) => {
      try {
        User.updateById(id, args)
      } catch (error) {
        console.log(error)
      }
      return true
    },
    deleteUser: (_, { id }) => {
      try {
        User.removeById(id)
      } catch (error) {
        console.log(error)
      }
      return true
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection()
  .then(async connection => {
    server.start(() => console.log("Server is running on localhost:4000"));

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch(error => console.log(error));
