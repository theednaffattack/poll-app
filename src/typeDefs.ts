export const typeDefs = `
  type User {
    id: Int!
    confirmed: Boolean
    email: String!
    password: String!
    username: String!
  }

  type PollOption {
    id: Int!
    text: String
    votes: [String]
    pollId: Int!
    createdBy: Int
  }

  type Poll {
    id: Int!
    options: [PollOption]
    name: String!
    createdBy: Int!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type Query {
    user(id: Int!): User!
    users: [User!]!
    poll(id: Int!): Poll
    allPolls: [Poll!]!
  }

  type Error {
    field: String!
    message: String!
  }

  type PollResponse {
    status: String
    errors: [Error!]
    poll: Poll
  }

  type VoteResponse {
    status: String
    errors: [Error!]
    poll: Poll
  }
  
  type Subscription {
    voteHappened: Int
  }

  type Mutation {
    vote(pollOptionId: Int!): VoteResponse
    createPoll(name: String!, options: [String!]!): PollResponse!
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(firstName: String, lastName: String, email: String): Boolean
    deleteUser(id: Int!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
