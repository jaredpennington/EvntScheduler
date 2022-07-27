import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditDeleteSelectors = ({
  eventId,
  guestId,
  passwordId,
  removeEvent,
  removeGuest,
  removePassword,
}) => {
  class getInfo {
    constructor() {
      // delete guest
      if (!passwordId && guestId) {
        this.id = guestId;
        this.target = "guest";
        this.delete = () => {
          removeGuest({
            variables: { id: guestId, eventId: eventId },
          });
          window.location.href = `/event/${eventId}/guests`;
        };
      }
      // delete password
      if (!guestId && passwordId) {
        this.id = passwordId;
        this.target = "password";
        this.delete = () => {
          removePassword({
            variables: { id: passwordId, eventId: eventId },
          });
          window.location.href = `/event/${eventId}/passwords`;
        };
      }
      // delete event
      if (!guestId && !passwordId) {
        this.id = eventId;
        this.target = null;
        this.delete = () => {
          removeEvent({
            variables: { id: eventId },
          });
          window.location.href = "/";
        };
      }
    }
  }

  const path = new getInfo();

  return (
    <div className="dots-position">
      <div className="dropdown">
        <button className="dropbtn">...</button>
        <ul className="dropdown-content">
          <Link to={`/event${path.target ? `/${path.target}` : ''}/${path.id}}/update`}>
          <li
            className=""
          >
            Update
          </li>
          </Link>

          <li onClick={() => path.delete()} className="">
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditDeleteSelectors;
