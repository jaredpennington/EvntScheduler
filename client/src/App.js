import "./index.css";
import React from "react";
import PartyForm from "./components/PartyForm";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import AuthService from "./utils/auth";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
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
            <Route path="/survey/:id">
              <PartyForm className=""></PartyForm>
            </Route>
            <Route
              path="/"
              element={AuthService.loggedIn() ? <Dashboard /> : <Home />}
            ></Route>
            <Route path="/event/:id">
              <Event></Event>
            </Route>
            <Route path="/event">
              <EventForm></EventForm>
            </Route>
            <Route path="/event/:id/:guests">
              <Event></Event>
            </Route>
            <Route path="/guest/:id">
              <Event></Event>
            </Route>
            <Route path="/event/:id/:passwords">
              <Event></Event>
            </Route>
            <Route path="/password/:id">
              <Event></Event>
            </Route>
            <Route path="*" element={<NoMatch />} />
            
          </div>
        </main>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
