//import the gql tagged template function
const { gql } = require("apollo-server-express");

// create out typeDefs for explicit schema types
const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    email: String
    events: [Event]
  }

  type Event {
    _id: ID
    user_id: String
    event_name: String
    additional_info: String
    date_windows: [[String]] # [[start, end], [start, end], ...etc.] (for calendar)
    guests: [Guest]
    passwords: [Password]
  }

  type Guest {
    _id: ID
    event_id: ID
    first_name: String
    last_name: String
    role: String
    date_windows: [[String]] # [[start, end], [start, end], ...etc.] (for calendar)
    completedAt: String
    budget: Int
    additional_info: String
  }

  type Password {
    _id: ID
    event_id: ID
    password: String
  }

  # must return token
  # optionally includes user data
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    events: [Event]
    event(_id: ID!): Event
    guests(event_id: ID!): [Guest]
    guest(_id: ID!): Guest
    passwords(event_id: ID!): [Password]
    password(_id: ID!): Password
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(
        first_name: String!, last_name: String!, email: String!, password: String!
    ): Auth

    addEvent(
        event_name: String!,
        date_windows: [[String]]!
        additional_info: String
    ): Event

    updateEvent(
        _id: ID!,
        event_name: String,
        additional_info: String
        date_windows: [[String]]
    ): Event

    removeEvent(_id: ID!): User

    addPassword(
        event_id: ID!
        password: String!
    ): Password
        
    updatePassword(
        _id: ID!
        password: String
    ): Password

    removePassword(
        _id: ID!
        event_id: ID!
    ): Event

    addGuest(
        event_id: ID!
        first_name: String!
        last_name: String!
        role: String!
        date_windows: [[String]]!
        budget: Int!
        additional_info: String
    ): Guest

    updateGuest(
        _id: ID!
        first_name: String
        last_name: String
        role: String
        date_windows: [[String]]
        budget: Int
        additional_info: String
    ): Guest

    removeGuest(
        _id: ID!
        event_id: ID!
    ): Event
  }
`;

module.exports = typeDefs;