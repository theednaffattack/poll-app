// TODO: figure out how to import this using ES6
// @types/dotenv is working for some reason
// below is busted
// import * as dotenv from "dotenv";
// require("dotenv").load();
// import dotenv from "dotenv";
import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { ipStore } from "./util/localLan";
import customLogger from "./util/logger";

const localLanAddresses = ipStore();

const { PORT = 7000 } = process.env;

// prepare the logger function for graphql-tools
const logger = { log: e => console.log(e) };

// build the schema manually so that we may use join-monster
const schema = makeExecutableSchema({
  typeDefs,
  resolvers, // optional
  customLogger, // optional
  allowUndefinedInResolve: false // optional
});

const server = new GraphQLServer({ schema });

createConnection()
  .then(() => {
    server.start(() => {
      if (localLanAddresses.length > 1) {
        console.log(`
Server started at
http://${localLanAddresses[localLanAddresses.length - 2]}:${PORT}
http://${localLanAddresses[localLanAddresses.length - 1]}:${PORT}
`);
      } else {
        console.log(`Server started on http://${localLanAddresses[0]}:${PORT}`);
      }
    });
  })
  .catch(error => console.log(error));
