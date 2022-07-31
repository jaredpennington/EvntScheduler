import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

const PasswordForm = ({ event_id }) => {
  const [formState, setFormState] = useState({
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
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='my-auto'>
    <div className='uk-card uk-card-body card-centering'>
      <h3 className='uk-card-title uk-text-center'>Survey Password Protection:</h3>
      <form className='form-centering form-input-margin' onChange={handleChange} onSubmit={handleFormSubmit}>
        <input
          className="form-input-margin"
          placeholder="Add Password"
          name="password"
          type="text"
          id="password"
        />
        <button className="form-input-margin button-border" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default PasswordForm;
