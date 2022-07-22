import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
    mutation AddEvent($eventName: String!, $dateWindows: [[String]]!) {
      addEvent(event_name: $eventName, date_windows: $dateWindows) {
        _id
        user_id
        event_name
        date_windows
      }
    }
`;

export const UPDATE_EVENT = gql`
    mutation UpdateEvent($id: ID!, $eventName: String, $dateWindows: [[String]]) {
      updateEvent(_id: $id, event_name: $eventName, date_windows: $dateWindows) {
        event_name
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
        }
      }
    }
`;

export const ADD_PASSWORD = gql`
    mutation AddPassword($eventId: ID!, $name: String!, $password: String!) {
      addPassword(event_id: $eventId, name: $name, password: $password) {
        event_id
        name
        password
      }
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($id: ID!, $name: String, $password: String) {
      updatePassword(_id: $id, name: $name, password: $password) {
        name
        password
      }
    }
`;

export const REMOVE_PASSWORD = gql`
    mutation RemovePassword($id: ID!, $eventId: ID!) {
      removePassword(_id: $id, event_id: $eventId) {
        passwords {
          name
          password
        }
      }
    }
`;

export const ADD_GUEST = gql`
    mutation AddGuest($eventId: ID!, $firstName: String!, $lastName: String!, $role: String!, $dateWindows: [[String]]!, $budget: Int!, $invitedTo: String) {
      addGuest(event_id: $eventId, first_name: $firstName, last_name: $lastName, role: $role, date_windows: $dateWindows, budget: $budget, invited_to: $invitedTo) {
        _id
        event_id
        date_windows
      }
    }
`;

export const UPDATE_GUEST = gql`
    mutation UpdateGuest($id: ID!, $firstName: String, $lastName: String, $role: String, $dateWindows: [[String]], $budget: Int) {
      updateGuest(_id: $id, first_name: $firstName, last_name: $lastName, role: $role, date_windows: $dateWindows, budget: $budget) {
        first_name
        last_name
        role
        date_windows
        budget
      }
    }
`;

export const REMOVE_GUEST = gql`
    mutation RemoveGuest($id: ID!, $eventId: ID!) {
      removeGuest(_id: $id, event_id: $eventId) {
        event_name
      }
    }
`;
