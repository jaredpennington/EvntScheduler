//import the gql tagged template function
const { gql } = require("apollo-server-express");

// create out typeDefs for explicit schema types
const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    email: String
  }

  type Event {
    _id: ID
    event_name: String
    bachelors_pass: String
    bachelorette_pass: String
    both_pass: String
    date_windows: [[String]]
    host: User
    guests: [Guest]
  }

  type Guest {
    _id: ID
    first_name: String
    last_name: String
    date_windows: [[String]]
    completedAt: String
    budget: Int
    invited_to: String
  }

  # must return token
  # optionally includes user data
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    guests: [Guest]
    guest(_id: ID!): Guest
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(
        first_name: String!, last_name: String!, email: String!, password: String!
    ): Auth
  }
`;

//export the typeDefs
module.exports = typeDefs;
