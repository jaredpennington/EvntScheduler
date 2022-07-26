import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

const PasswordForm = ({ event_id }) => {
  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });

  const [addPassword, { error }] = useMutation(ADD_PASSWORD, {
    update(cache, { data: { addPassword } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });

        cache.writeQuery({
          query: QUERY_EVENT,
          data: {
            event: { ...event, passwords: [...event.passwords, addPassword] },
          },
        });
      } catch (e) {
        console.warn("First password insertion by user!");
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPassword({
        variables: { ...formState, eventId: event_id },
      });
      window.location.href = `/event/${event_id}/passwords`;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onChange={handleChange} onSubmit={handleFormSubmit}>
        <input
          className=""
          placeholder="Password Name"
          name="name"
          type="text"
          id="name"
        />
        <input
          className=""
          placeholder="Password"
          name="password"
          type="text"
          id="password"
        />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordForm;
