import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams, Link } from "react-router-dom";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  let event_id = useParams().id;
  return (
    <div>
      <nav>
        <ul className="">
          <li><Link to={`/event/${event_id}/guests`}>Guests</Link></li>
          <li><Link to={`/event/${event_id}/passwords`}>Passwords</Link></li>
          <li><Link to={`/event/${event_id}/passwords`}>Third thing lol</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Event

