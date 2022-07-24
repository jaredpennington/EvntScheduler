import React from 'react';
import { Link } from "react-router-dom";

const NavBar = ({event_id}) => {
    
    return (
        <nav>
        <ul className="">
          <li><Link to={`/event/${event_id}/guests`}>Guests</Link></li>
          <li><Link to={`/event/${event_id}/passwords`}>Passwords</Link></li>
          <li><Link to={`/event/${event_id}/passwords`}>Third thing lol</Link></li>
        </ul>
      </nav>
    );
}

export default NavBar;