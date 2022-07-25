import React from 'react';
import { Link } from "react-router-dom";

const NavBar = ({event_id}) => {
    return (
        <nav>
        <ul className="">
          <li><Link to={`/event/${event_id}`}>Calendar</Link></li>
          <li><Link to={`/event/${event_id}/guests`}>Guests</Link></li>
          <li><Link to={`/event/${event_id}/passwords`}>Passwords</Link></li>
          <li><Link to={`/event/${event_id}/surveylink`}>Survey</Link></li>
        </ul>
      </nav>
    );
}

export default NavBar;