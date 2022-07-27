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
  let update;
  const [selected, setSelected] = useState("");
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
            {selected === index ? (
              <PasswordForm />
            ) : (
              <div className="post-pass form-input-margin ">
                <EditDeleteSelectors
                  eventId={password.event_id}
                  guestId={null}
                  passwordId={password._id}
                  removePassword={removePassword}
                  setSelected={setSelected}
                  selected={selected}
                />
                <div>{password.name}</div>
                <div>{password.password}</div>
              </div>
            )}
          </span>
        ))
      )}
    </div>
  );
};

export default Passwords;
