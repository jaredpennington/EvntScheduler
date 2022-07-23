import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

// the homepage if the user is logged in. Will include all the user's events
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  let sessionUserInfo = Auth.getProfile();
  let userId = sessionUserInfo.data._id;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : data ? (
        data.events.map((event, index) => (
          <div key={index}>
            <div>
              <Link to={`/event/${event._id}`}>{event.event_name}</Link>
            </div>
            <div>
              <Link to={`/event/${event._id}/guests`}>Guests:</Link>{" "}
              {Object.keys(event.guests).length
                ? Object.keys(event.guests).length
                : "none"}
            </div> 
            <div>
              <Link to={`/event/${event._id}/passwords`}>Passwords:</Link>{" "}
              {Object.keys(event.passwords).length
                ? Object.keys(event.passwords).length
                : "none"}
            </div>
            <div>Considered dates for event: </div>
            {Object.values(event.date_windows).map((date, index) => (
              <div key={index}>{date[0]} - {date[date.length - 1]}</div>
            ))}
          </div>
        ))
      ) : (
        <div>
          <Link to={`event/${userId}/survey`}>
            Click here to make an event!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
