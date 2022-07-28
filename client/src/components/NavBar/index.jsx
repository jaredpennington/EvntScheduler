import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";


const NavBar = ({ event_id }) => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };
  return (
    <nav className="nav-bar">
      <ul className="nav-bar-links">
        <li>
          <Link to={`/event/${event_id}`} className="nav-bar-single">
            Calendar
          </Link>
        </li>
        <li>
          <Link to={`/event/${event_id}/guests`} className="nav-bar-single">
            Guests
          </Link>
        </li>
        <li>
          <Link to={`/event/${event_id}/passwords`} className="nav-bar-single">
            Passwords
          </Link>
        </li>
        <li>
          <Link to={`/event/${event_id}/surveylink`} className="nav-bar-single">
            Survey
          </Link>
        </li>
        <li>
          <button className="nav-bar-single" onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
