import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_GUEST } from "../utils/queries";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// single guest, showing all their info including availability, budget, role, etc.
const Guest = () => {
  const { loading, error, data } = useQuery(QUERY_GUEST, {
    variables: { id: useParams().id }
  });
  let guest;
  if(!loading) guest = data.guest;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
          <div>
            <div><Link to={`/guest/${guest._id}`}> {guest.first_name} {guest.last_name}</Link></div>
            <div>Budget: {guest.budget}</div>
            {Object.values(guest.date_windows).map((date, index) => (
              <div key={index}>{date[0]} - {date[date.length - 1]}</div>
            ))}
            <div>Invited to: {guest.invited_to}</div>
            <div>Role: {guest.role}</div>
          </div>
      )}
    </div>
  )
}

export default Guest

