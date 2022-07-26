import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_GUESTS } from "../utils/queries";
import { REMOVE_GUEST } from "../utils/mutations";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import EditDeleteSelectors from "../components/EditDeleteSelectors";

// Will display all guests for a single event
const Guests = () => {
  let event_id = useParams().id;
  const { loading, error, data } = useQuery(QUERY_GUESTS, {
    variables: { event_id: event_id }
  });

  const [removeGuest, { err }] = useMutation(REMOVE_GUEST, {
    update(cache, { data: { removeGuest } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });
        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: { ...event, guests: [...event.guests, removeGuest] } },
        });
      } catch (e) {
        console.warn(e);
      }
    },
  });

  return (
    <div>
      <NavBar event_id={event_id} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.guests.map((guest, index) => (
          <div key={index} className="relative">
            <EditDeleteSelectors eventId={guest.event_id} guestId={guest._id} passwordId={null} removeGuest={removeGuest} />
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

