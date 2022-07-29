import React from 'react';
import UpdateEventForm from "../components/UpdateEventForm";

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const EventUpdate = () => {
  return (
    <div>
      <UpdateEventForm />
    </div>
  )
}

export default EventUpdate

