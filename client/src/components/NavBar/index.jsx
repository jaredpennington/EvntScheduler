import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";

const NavBar = ({ event_id }) => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };

  const navOptions = [
    {
      link: `/event/${event_id}`,
      name: "Calendar",
    },
    {
      link: `/event/${event_id}/guests`,
      name: "Guests",
    },
    {
      link: `/event/${event_id}/passwords`,
      name: "Passwords",
    },
    {
      link: `/event/${event_id}/surveylink`,
      name: "Survey",
    },
  ];
  return (
    <nav className="nav-bar">
      <ul className="nav-bar-links">
        {navOptions.map((option, index) => (
          <li>
            <Link to={option.link} className="nav-bar-single">
              {option.name}
            </Link>
          </li>
        ))}
        <li>
          <button className="nav-bar-single" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
