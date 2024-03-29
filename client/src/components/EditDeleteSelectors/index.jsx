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
        this.eventId = eventId;
        this.target = "guest";
        this.delete = () => {
          if(window.confirm(`Permanently delete this ${this.target}?`)) {
            removeGuest({
              variables: { id: guestId, eventId: eventId },
            });
            window.location.href = `/event/${eventId}/guests`;
          }
        };
      }
      // delete password
      if (!guestId && passwordId) {
        this.id = passwordId;
        this.eventId = eventId;
        this.target = "password";
        this.delete = () => {
          if(window.confirm(`Permanently delete this ${this.target}?`)) {
            removePassword({
              variables: { id: passwordId, eventId: eventId },
            });
            window.location.href = `/event/${eventId}/passwords`;
          }
        };
      }
      // delete event
      if (!guestId && !passwordId) {
        this.id = eventId;
        this.target = null;
        this.delete = () => {
          if(window.confirm(`Permanently delete this event?`)) {
            removeEvent({
              variables: { id: eventId },
            });
            window.location.href = "/";
          }
        };
      }
    }
  }

  const path = new getInfo();

  return (
    <div className="dots-position">
      <div className="dropdown">
        <button className="dropbtn"><i className="fa-solid fa-gears"></i></button>
        <ul className="dropdown-content">
          <Link to={`/event${path.target ? `/${eventId}/${path.target}` : ''}/${path.id}/update`}>
          <li
            className=""
          >
            Update
          </li>
          </Link>

          <li onClick={() => path.delete()} className="delete-btn">
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditDeleteSelectors;
