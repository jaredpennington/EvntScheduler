import React from "react";

const EditDeleteSelectors = ({ eventId, guestId, passwordId }) => {
  const handleRemove = (event) => {
    // delete event
    if (!guestId && !passwordId) {
    }
    // delete guest
    if (!passwordId && guestId) {
    }
    // delete password
    if (!guestId && passwordId) {
    }
  };

  const handleUpdate = (event) => {
    // update event
    if (!guestId && !passwordId) {
    }
    // update guest
    if (!passwordId && guestId) {
    }
    // update password
    if (!guestId && passwordId) {
    }
  };

  return (
    <div className="dots-position">
      <div className="dropdown">
        <button className="dropbtn">...</button>
        <ul className="dropdown-content">
          <li className="">Update</li>
          <li className="" onClick={handleRemove}>
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditDeleteSelectors;
