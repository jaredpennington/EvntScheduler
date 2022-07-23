import "./index.css";
import React from "react";
import AuthService from "./utils/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Event from "./pages/Event";
import Guest from "./pages/Guest";
import Guests from "./pages/Guests";
import Password from "./pages/Password";
import Passwords from "./pages/Passwords";
import Survey from "./pages/Survey";
import NoMatch from "./pages/NoMatch";

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
  uri: "graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <main>
          <div className="">
            <Route
              path="/"
              element={AuthService.loggedIn() ? <Dashboard /> : <Home />}
            ></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/event/:id/survey" element={<Survey />} />
            <Route path="/event/:id/:guests" element={<Guests />} />
            <Route path="/guest/:id" element={<Guest />} />
            <Route path="/event/:id/:passwords" element={<Passwords />} />
            <Route path="/password/:id" element={<Password />} />
            <Route path="*" element={<NoMatch />} />
          </div>
        </main>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
