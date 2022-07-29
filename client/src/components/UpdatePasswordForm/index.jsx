import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UPDATE_PASSWORD } from "../../utils/mutations";
import { QUERY_EVENT, QUERY_PASSWORD } from "../../utils/queries";

const UpdatePasswordForm = () => {
  const passwordId = useParams().id;
  const eventId = useParams().eventId;
  const [formState, setFormState] = useState({
    password: () => {
      if (!loading) {
        return data.password.password;
      }
    },
  });

  const { loading, data } = useQuery(QUERY_PASSWORD, {
    variables: { id: passwordId },
  });

  const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD, {
    update(cache, { data: { updatePassword } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });

        cache.writeQuery({
          query: QUERY_EVENT,
          data: {
            event: {
              ...event,
              passwords: [...event.passwords, updatePassword],
            },
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
      await updatePassword({
        variables: { ...formState, id: passwordId },
      });
      window.location.href = `/event/${eventId}/passwords`;
    } catch (e) {
      console.error(e);
    }
  };

  if(!loading) console.log(data);

  return (
    <div className="my-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="uk-card uk-card-body card-centering">
          <h3 className="uk-card-title uk-text-center">
            Update Survey Password:
          </h3>
          <form
            className="form-centering form-input-margin"
            onChange={handleChange}
            onSubmit={handleFormSubmit}
          >
            <input
              className="form-input-margin"
              placeholder="Add Password"
              name="password"
              type="text"
              id="password"
              defaultValue={data.password.password}
            />
            <button className="form-input-margin button-border" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePasswordForm;
