import { gql } from "@apollo/client";

// all events associated with the session user
 export const QUERY_EVENTS = gql`
    query Events {
      events {
        _id
        event_name
        date_windows
        guests {
          _id
          first_name
          last_name
          role
          date_windows
          completedAt
          budget
          invited_to
        }
        passwords {
          _id
          event_id
          name
          password
        }
      }
    }
`;

// single event, get by _id
export const QUERY_EVENT = gql`
    query Event($id: ID!) {
      event(_id: $id) {
        _id
        user_id
        event_name
        date_windows
        guests {
          _id
          event_id
          first_name
          last_name
          role
          date_windows
          completedAt
          budget
          invited_to
        }
        passwords {
          _id
          event_id
          password
        name
        }
      }
    }
`;

// all guests associated with an event
export const QUERY_GUESTS = gql`
    query Guests($event_id: ID!) {
      guests(event_id: $event_id) {
        _id
        event_id
        first_name
        last_name
        role
        date_windows
        completedAt
        budget
        invited_to
      }
    }
`;

// single guest by _id
export const QUERY_GUEST = gql`
    query Guest($id: ID!) {
      guest(_id: $id) {
        _id
        event_id
        first_name
        last_name
        role
        date_windows
        completedAt
        budget
        invited_to
      }
    }
`;

// all passwords associated with an event
export const QUERY_PASSWORDS = gql`
    query Passwords($event_id: ID!) {
      passwords(event_id: $event_id) {
        _id
        name
        password
      }
    }
`;

// single password by _id
export const QUERY_PASSWORD = gql`
    query Password($id: ID!) {
      password(_id: $id) {
        _id
        event_id
        name
        password
      }
    }
`;