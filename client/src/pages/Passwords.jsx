import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PASSWORDS } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

// all passwords for a single event
const Passwords = () => {
  let event_id = useParams().id;
  const { loading, data } = useQuery(QUERY_PASSWORDS, {
    variables: { event_id: event_id },
  });

  return (
    <div>
      <NavBar event_id={event_id} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.passwords.map((password, index) => (
          <div key={index}>
            <div>{password.name}</div>
            <div>{password.password}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Passwords;
