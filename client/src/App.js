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
            <Route
              path="/"
              element={AuthService.loggedIn() ? <Dashboard /> : <Home />}
            ></Route>
            <Route path="/event/:id">
              <Event></Event>
            </Route>
            <Route path="/event/:id/survey">
              <Survey></Survey>
            </Route>
            <Route path="/event/:id/:guests">
              <Guests></Guests>
            </Route>
            <Route path="/guest/:id">
              <Guest></Guest>
            </Route>
            <Route path="/event/:id/:passwords">
              <Passwords></Passwords>
            </Route>
            <Route path="/password/:id">
              <Password></Password>
            </Route>
            <Route path="*" element={<NoMatch />} />
            
          </div>
        </main>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
