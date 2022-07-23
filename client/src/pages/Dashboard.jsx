import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

// the homepage if the user is logged in. Will include all the user's events 
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  let sessionUserInfo = Auth.getProfile();
  let userId = sessionUserInfo.data._id;

  let events = data.events;
  console.log(events);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : data ? (
        events.map((event, index) => (
         <div>
          <div><Link to={`/event/${event._id}`} >{event.event_name}</Link></div>
         </div> 
        ))
      ) : (
        <div><Link to={`event/${userId}/survey`}>Click here to make an event!</Link></div>
      )}
    </div>
  )
}

export default Dashboard

