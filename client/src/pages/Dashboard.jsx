import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../utils/queries";
import { REMOVE_EVENT } from "../utils/mutations";
import dateFormat from "../utils/dateFormat";
import { Link } from "react-router-dom";
import EditDeleteSelectors from "../components/EditDeleteSelectors";

// the homepage if the user is logged in. Will include all the user's events
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  const [removeEvent, { err }] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, removeEvent] } },
        });
      } catch (e) {
        console.warn("Something went wrong");
      }
    },
  });

  return (
    <div className="uk-child-width-expand@s uk-text-center grid-three" uk-grid>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.events.map((event, index) => (
          // put card styling in this div VVV

          <div key={index} className="uk-card-body event-card-centering uk-card uk-card-default ">
            <div
              className="uk-card-title uk-text-center "
            >
            <EditDeleteSelectors eventId={event._id} guestId={null} passwordId={null} removeEvent={removeEvent} />
              <div className="uk-card-title"><Link to={`/event/${event._id}`}>{event.event_name}</Link></div>
              <div>
                Guests:{" "}
                {Object.keys(event.guests).length
                  ? Object.keys(event.guests).length
                  : "none"}
              </div>
              <div>
                Passwords:{" "}
                {Object.keys(event.passwords).length
                  ? Object.keys(event.passwords).length
                  : "none"}
              </div>
              <div>Considered dates for event: </div>
              {Object.values(event.date_windows).map((date, index) => (
                <div key={index}>
                  {date[0]} - {date[date.length - 1]}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      {!loading ? (
        // Add small card here for this button thing VVV
        <div>
          <Link to="event/create">Click here to make an event!</Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
