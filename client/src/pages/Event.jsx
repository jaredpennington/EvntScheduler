import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  let event_id = useParams().id;
  console.log(window.location.pathname.split("/")[2])
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: event_id },
  });

  if(!loading) console.log(data.event);
  
  return (
    <div>
      <NavBar event_id={event_id} />
    </div>
  )
}


export default Event

