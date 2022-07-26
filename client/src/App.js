import "./index.css";
import React, { useEffect } from "react";
import AuthService from "./utils/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";

import Event from "./pages/Event";
import Guest from "./pages/Guest";

import EventUpdate from "./pages/EventUpdate";
import GuestUpdate from "./pages/GuestUpdate";
import PasswordUpdate from "./pages/PasswordUpdate";

import Guests from "./pages/Guests";
import Passwords from "./pages/Passwords";
import Survey from "./pages/Survey";
import SurveyLink from "./pages/SurveyLink";
import NoMatch from "./pages/NoMatch";
import ThankYou from "./pages/ThankYou";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };

  let event_id;

  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <header>
            <div>
              <Link to="/" className="font-evnt-thin">
                EVNT
              </Link>
            </div>
            {AuthService.loggedIn() && <button onClick={logout}>Logout</button>}
            {useParams().id && (
              <nav className="nav-bar">
                <ul className="nav-bar-links">
                  <li>
                    <Link to={`/event/${event_id}`} className="nav-bar-single">
                      Calendar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/event/${event_id}/guests`}
                      className="nav-bar-single"
                    >
                      Guests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/event/${event_id}/passwords`}
                      className="nav-bar-single"
                    >
                      Passwords
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/event/${event_id}/surveylink`}
                      className="nav-bar-single"
                    >
                      Survey
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </header>
          <Routes>
            <Route
              path="/"
              element={AuthService.loggedIn() ? <Dashboard /> : <Home />}
            ></Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Create */}
            <Route path="/event/create" element={<CreateEvent />} />
            <Route path="/event/:id/survey" element={<Survey />} />

            {/* Update */}
            <Route path="/event/:id/update" element={<EventUpdate />} />
            <Route
              path="/event/:eventId/guest/:id/update"
              element={<GuestUpdate />}
            />
            <Route
              path="/event/:eventId/password/:id/update"
              element={<PasswordUpdate />}
            />

            <Route path="/event/:id" element={<Event />} />
            <Route path="/event/:id/surveylink" element={<SurveyLink />} />
            <Route path="/event/:id/guests" element={<Guests />} />
            <Route path="/guest/:id" element={<Guest />} />

            <Route path="/event/:id/passwords" element={<Passwords />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
