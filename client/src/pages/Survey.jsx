import React from 'react';
import PartyForm from "../components/PartyForm";

// the survey that will be sent out to guests. Responses will be stored into Guests in the database
const Survey = ({setButtonVisible, setSelectable, selectable}) => {
  return (
    <div>
      <PartyForm setButtonVisible={setButtonVisible} setSelectable={setSelectable} selectable={selectable} />
    </div>
  )
}

export default Survey

