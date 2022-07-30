import React from 'react';
import UpdateEventForm from "../components/UpdateEventForm";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const EventUpdate = () => {
  let eventId = useParams().id;
  return (
    <div>
      <Header />
      <NavBar event_id={eventId} />
      <UpdateEventForm />
    </div>
  )
}

export default EventUpdate

