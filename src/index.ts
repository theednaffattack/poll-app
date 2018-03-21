import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/User"; // imported type for typeOrm
import { ResolverMap } from "./types/ResolverType"; // imported types for typeOrm
import { Profile } from "./entity/Profile";

const typeDefs = `
  type User {
    id: Int!
    age: Int!
    firstName: String!
    lastName: String!
    email: String!
    confirmed: Boolean
    profile: Profile
  }

  type Profile {
    favoriteColor: String!
  }

  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }

  input ProfileInput {
    favoriteColor: String!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!, email: String!, profile: ProfileInput): User!
    updateUser(firstName: String, lastName: String, age: Int, email: String): Boolean
    deleteUser(id: Int!): Boolean
  }
`;

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => `hello ${name || "World"}`,
    user: async (_, { id }) => {
      const user = await User.findOneById(id, { relations: ["profile"] });
      console.log(user);
      return user;
    },
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, args) => {
      const profile = Profile.create({ ...args.profile });
      await profile.save();

      const user = User.create({
        firstName: args.firstName,
        age: args.age,
        email: args.email,
        lastName: args.lastName,
        confirmed: args.confirmed,
        profileId: profile.id
      });

      await user.save();

      return { ...user, profile };
    },
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
