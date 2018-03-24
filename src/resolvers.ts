import { PubSub } from "graphql-yoga";

import { ResolverMap } from "./types/ResolverType"; // imported types for typeOrm
import { User } from "./entity/User"; // imported type for typeOrm
import { Poll } from "./entity/Poll"; // imported type for typeOrm
import { PollOption } from "./entity/PollOption"; // imported type for typeOrm

const pubsub = new PubSub();

const VOTE_HAPPENED = "VOTE_HAPPENED";

export const resolvers: ResolverMap = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findOneById(id, {
        relations: ["polls", "pollOptions"]
      });
      console.log(user);
      return user;
    },
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = User.create({
        username: args.username,
        email: args.email,
        confirmed: args.confirmed,
        password: args.password
      });

      await user.save();
      console.log("user");
      console.log(user);
      return { ...user };
    },
    createPoll: async (_, args) => {
      console.log("args");
      console.log(args);
      const poll = Poll.create({
        name: args.name,
        options: []
      });

      // next save the poll options
      // grab args.options and make each a pollOption
      // by writing each row as pollOption.text
      // then write each pollOption.id into the poll.options array

      const pollOption = PollOption.create({
        text: args.options[0],
        createdBy: 4,
        pollId: poll.id
      });

      await pollOption.save();

      poll.options.push(pollOption.id);

      await poll.save();
      poll.id;
      console.log("poll");
      console.log(JSON.stringify(poll, null, 2));
      return { ...poll };
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
  },
  Subscription: {
    voteHappened: () => {
      subscribe: () => pubsub.asyncIterator(VOTE_HAPPENED);
    }
  }
};
