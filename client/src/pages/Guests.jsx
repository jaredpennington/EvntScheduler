import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_GUESTS } from "../utils/queries";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// Will display all guests for a single event
const Guests = () => {
  const { loading, error, data } = useQuery(QUERY_GUESTS, {
    variables: { event_id: useParams().id }
  });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.guests.map((guest, index) => (
          <div key={index}>
            <div><Link to={`/guest/${guest._id}`}> {guest.first_name} {guest.last_name}</Link></div>
            <div>Budget: {guest.budget}</div>
            {Object.values(guest.date_windows).map((date, index) => (
              <div key={index}>{date[0]} - {date[date.length - 1]}</div>
            ))}
            <div>Invited to: {guest.invited_to}</div>
            <div>Role: {guest.role}</div>
          </div>
        ))
      ) }
    </div>
  )
}

export default Guests

