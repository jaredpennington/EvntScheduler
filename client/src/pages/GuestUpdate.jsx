import React from 'react';
import UpdateGuestForm from "../components/UpdateGuestForm";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const GuestUpdate = () => {
  let eventId = useParams().eventId;
  return (
    <div>
      <Header />
      <NavBar event_id={eventId} />
      <UpdateGuestForm />
    </div>
  )
}

export default GuestUpdate

