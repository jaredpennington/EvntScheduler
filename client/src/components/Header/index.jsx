import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-gradient">
        <Link to="/" className="font-evnt-thin">
          EVNT
        </Link>
      </div>
    </header>
  );
}

export default Header;
