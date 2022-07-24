import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { Link } from "react-router-dom";

// the homepage if the user is logged in. Will include all the user's events
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.events.map((event, index) => (
          // put card styling in this div VVV

          <div className="uk-child-width-expand@s" uk-grid>
            <div
              key={index}
              className="uk-card uk-card-default uk-card-body card-padding uk-card"
            >
              <div className="uk-card-title">{event.event_name}</div>
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
          <Link to="event/createEvent">Click here to make an event!</Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
