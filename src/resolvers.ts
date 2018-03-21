import { ResolverMap } from "./types/ResolverType"; // imported types for typeOrm
import { User } from "./entity/User"; // imported type for typeOrm

export const resolvers: ResolverMap = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findOneById(id, { relations: ["profile"] });
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
        confirmed: args.confirmed
      });

      await user.save();

      return { ...user };
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
