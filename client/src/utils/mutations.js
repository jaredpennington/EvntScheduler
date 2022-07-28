import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        first_name
        last_name
        email
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent(
    $eventName: String!
    $dateWindows: [[String]]!
    $additionalInfo: String
  ) {
    addEvent(
      event_name: $eventName
      date_windows: $dateWindows
      additional_info: $additionalInfo
    ) {
      _id
      event_name
      additional_info
      date_windows
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $eventName: String
    $additionalInfo: String
    $dateWindows: [[String]]
  ) {
    updateEvent(
      _id: $id
      event_name: $eventName
      additional_info: $additionalInfo
      date_windows: $dateWindows
    ) {
      event_name
      additional_info
      date_windows
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation RemoveEvent($id: ID!) {
    removeEvent(_id: $id) {
      events {
        _id
        event_name
        date_windows
        additional_info
      }
    }
  }
`;

export const ADD_PASSWORD = gql`
  mutation AddPassword($eventId: ID!, $password: String!) {
    addPassword(event_id: $eventId, password: $password) {
      password
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation AddPassword($eventId: ID!, $password: String!) {
    addPassword(event_id: $eventId, password: $password) {
      password
    }
  }
`;

export const REMOVE_PASSWORD = gql`
  mutation RemovePassword($id: ID!, $eventId: ID!) {
    removePassword(_id: $id, event_id: $eventId) {
      passwords {
        _id
        password
      }
    }
  }
`;

export const ADD_GUEST = gql`
  mutation AddGuest(
    $eventId: ID!
    $firstName: String!
    $lastName: String!
    $role: String!
    $dateWindows: [[String]]!
    $budget: Int!
    $additionalInfo: String
  ) {
    addGuest(
      event_id: $eventId
      first_name: $firstName
      last_name: $lastName
      role: $role
      date_windows: $dateWindows
      budget: $budget
      additional_info: $additionalInfo
    ) {
      first_name
      last_name
      role
      date_windows
      budget
      additional_info
    }
  }
`;

export const UPDATE_GUEST = gql`
  mutation UpdateGuest(
    $id: ID!
    $firstName: String
    $lastName: String
    $role: String
    $dateWindows: [[String]]
    $budget: Int
    $additionalInfo: String
  ) {
    updateGuest(
      _id: $id
      first_name: $firstName
      last_name: $lastName
      role: $role
      date_windows: $dateWindows
      budget: $budget
      additional_info: $additionalInfo
    ) {
      first_name
      last_name
      role
      date_windows
      budget
      additional_info
    }
  }
`;

export const REMOVE_GUEST = gql`
  mutation RemoveGuest($id: ID!, $eventId: ID!) {
    removeGuest(_id: $id, event_id: $eventId) {
      guests {
        _id
        first_name
        last_name
        role
      }
    }
  }
`;
