import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_GUESTS } from "../utils/queries";
import { REMOVE_GUEST } from "../utils/mutations";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import EditDeleteSelectors from "../components/EditDeleteSelectors";
import Header from "../components/Header";
import { formatDate } from "@fullcalendar/core";
import dateFormat from "../utils/dateFormat";

// Will display all guests for a single event
const Guests = () => {
  let event_id = useParams().id;
  const { loading, error, data } = useQuery(QUERY_GUESTS, {
    variables: { eventId: event_id },
  });

  const [totals, setTotals] = useState(0);
  const [guests, setGuests] = useState([]);

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

  useEffect(() => {
    if (!loading && data.guests) {
      setTotals(data.guests.map((guest) => (totals += guest.budget)));
      setGuests(data.guests);
      console.log(guests)
    }
  }, [loading]);

  if(!loading) console.log(data);
  return (
    <div>
      <Header />
      <NavBar event_id={event_id} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {guests.length ? (
            <div className="budget-card">
              Total Budget: $
              {totals.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          ) : (
            <div>
              Send out your{" "}
              <Link to={`/event/${event_id}/surveyLink`}>survey</Link> and
              responses will be displayed here!
            </div>
          )}
          {guests.length > 0 &&
            guests.map((guest, index) => (
              <div key={index} className="guest-cards">
                <EditDeleteSelectors
                  eventId={guest.event_id}
                  guestId={guest._id}
                  passwordId={null}
                  removeGuest={removeGuest}
                />

                <div>
                  <Link to={`/guest/${guest._id}`}>
                    {guest.first_name} {guest.last_name}
                  </Link>
                </div>
                <div>
                  Budget: $
                  {guest.budget.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                {Object.values(guest.date_windows).map((date, index) => (
                  <div key={index}>
                    {formatDate(date[0], dateFormat)} -{" "}
                    {formatDate(date[date.length - 1], dateFormat)}
                  </div>
                ))}
                <div>Role: {guest.role}</div>
                <div>Additional information: {guest.additional_info}</div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Guests;
