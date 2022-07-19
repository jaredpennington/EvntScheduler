//import the gql tagged template function
const { gql } = require("apollo-server-express");

// create out typeDefs for explicit schema types
const typeDefs = gql`
  type Planner {
    _id: ID
    first_name: String
    last_name: String
    email: String
    bachelors_pass: String
    bachelorette_pass: String
    both_pass: String
    date_windows: [[String]]
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
    user: Planner
  }

  type Query {
    me: Planner
    guests: [Guest]
    guest(_id: ID!): Guest
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

//export the typeDefs
module.exports = typeDefs;
