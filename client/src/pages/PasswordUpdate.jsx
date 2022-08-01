import React from 'react';
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import BurgerMenu from '../components/BurgerMenu';

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const EventPassword = () => {
  let eventId = useParams().eventId;
  return (
    <div>
      <Header />
      <NavBar event_id={eventId} />
      <BurgerMenu event_id={eventId} />

      <UpdatePasswordForm />
    </div>
  )
}

export default EventPassword

