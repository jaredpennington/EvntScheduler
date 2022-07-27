import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PASSWORDS, QUERY_EVENT } from "../utils/queries";
import { REMOVE_PASSWORD } from "../utils/mutations";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import EditDeleteSelectors from "../components/EditDeleteSelectors";
import PasswordForm from "../components/PasswordForm";

// all passwords for a single event
const Passwords = () => {
  let eventId = useParams().id;
  const { loading, data } = useQuery(QUERY_PASSWORDS, {
    variables: { eventId: eventId },
  });

  const [removePassword, { err }] = useMutation(REMOVE_PASSWORD, {
    update(cache, { data: { removePassword } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });
        cache.writeQuery({
          query: QUERY_EVENT,
          data: {
            event: {
              ...event,
              passwords: [...event.passwords, removePassword],
            },
          },
        });
      } catch (e) {
        console.warn(e);
      }
    },
  });

  return (
    <div>
      <NavBar event_id={eventId} />
      <PasswordForm event_id={eventId} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.passwords.map((password, index) => (
          <span key={index}>
<<<<<<< HEAD
              <div className="relative">
=======
            {selected === index ? (
              <PasswordForm />
            ) : (
              <div className="post-pass form-input-margin ">
>>>>>>> 728f9c11bfb75eda5eaeb5e8b6c7a06e10d0b87b
                <EditDeleteSelectors
                  eventId={password.event_id}
                  guestId={null}
                  passwordId={password._id}
                  removePassword={removePassword}
                />
                <div>{password.name}</div>
                <div>{password.password}</div>
              </div>
          </span>
        ))
      )}
    </div>
  );
};

export default Passwords;
