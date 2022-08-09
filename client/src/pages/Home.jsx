import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

// starting page when the user is not logged in.
// this page will describe the app and explain how to get started.

const Home = () => {
  return (
    <>
      <Header />
      <div className="getting-centered">
        <div className="homepage-positioning">
          <p className="font-evnt-large">Use EVNT to plan everything.</p>
          <div className="flex">
            <Link to="/login" className="getting-started-login">
              <button className="">Login</button>
            </Link>

            <Link to="/signup" className="getting-started-signup">
              <button className="">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
