import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/User"; // imported type for typeOrm
import { ResolverMap } from "./types/ResolverType"; // imported types for typeOrm

const typeDefs = `
  type User {
    id: Int!
    age: Int!
    firstName: String!
    lastName: String!
    email: String!
    confirmed: Boolean!
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
    user: (_, { id }) => User.findOneById(id),
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, args) => await User.create(args).save(),
    updateUser: async (_, { id, ...args }) => {
      try {
        await User.updateById(id, args);
      } catch (error) {
        console.log(error);
      }
      return true;
    },
    deleteUser: async (_, { id }) => {
      try {
        await User.removeById(id);

        // An example of using query builder to have
        // conditional rules for CRUD operations

        // const deleteQuery = getConnection()
        //   .createQueryBuilder()
        //   .delete()
        //   .from(User)
        //   .where("id = :id", { id });
        // if (id === 1) {
        //   deleteQuery.andWhere("email = :email", { email: "bob@bob.com" });
        // }
        // await deleteQuery.execute();
      } catch (error) {
        console.log(error);
      }
      return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection()
  .then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch(error => console.log(error));
