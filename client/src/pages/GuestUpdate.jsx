import React from 'react';
import UpdateGuestForm from "../components/UpdateGuestForm";

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const GuestUpdate = () => {
  return (
    <div>
      <UpdateGuestForm />
    </div>
  )
}

export default GuestUpdate

