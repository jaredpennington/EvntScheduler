import { gql } from "@apollo/client";

// get session user
export const QUERY_ME = gql`
  query Me {
    me {
      _id
      first_name
      last_name
      email
      events {
        _id
        user_id
        event_name
        additional_info
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
          additional_info
        }
        passwords {
          _id
          event_id
          password
        }
      }
    }
  }
`;

// all events associated with the session user
export const QUERY_EVENTS = gql`
  query Events {
    events {
      _id
      user_id
      event_name
      additional_info
      date_windows
      guests {
        _id
        first_name
        last_name
        role
        date_windows
        completedAt
        budget
        additional_info
      }
      passwords {
        _id
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
      additional_info
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
        additional_info
      }
      passwords {
        _id
        password
      }
    }
  }
`;

// all guests associated with an event
export const QUERY_GUESTS = gql`
  query Guests($eventId: ID!) {
    guests(event_id: $eventId) {
      _id
      event_id
      first_name
      last_name
      role
      date_windows
      completedAt
      budget
      additional_info
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
      additional_info
    }
  }
`;

// all passwords associated with an event
export const QUERY_PASSWORDS = gql`
  query Passwords($eventId: ID!) {
    passwords(event_id: $eventId) {
      _id
      event_id
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
      password
    }
  }
`;
