import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import dateFormat from "../utils/dateFormat";
import { Link } from "react-router-dom";

// the homepage if the user is logged in. Will include all the user's events
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  // if(!loading && data) console.log(data.events[data.events.length - 1].date_windows);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.events.map((event, index) => (
          // put card styling in this div VVV

          // Padding grid margin anything i put from tailwind to uikit hasnt changed anything and i need to move on ive been stuck on this for too long omfgggg

          <div key={index} >
            <div
              className="uk-card uk-card-default uk-card-body card-padding uk-card "
            >
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
        // maybe we could have the component form to create an event here? Will have to discuss
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
