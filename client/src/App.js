import "./index.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import AuthService from "./utils/auth";

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
import ThankYou from "./pages/ThankYou";
import Footer from "./components/Footer";
import { useEffect } from "react";
import FourOhFour from "./pages/FourOhFour";

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
  

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <main className="page-container">
            <div className="content-wrap">
              <Routes>
                <Route
                  path="/"
                  element={AuthService.loggedIn() ? <Dashboard /> : <Home />}
                ></Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Create */}
                <Route path="/event/create" element={<CreateEvent />} />
                <Route
                  path="/event/:id/survey"
                  element={
                    <Survey />
                  }
                />

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
                <Route path="*" element={<FourOhFour />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
