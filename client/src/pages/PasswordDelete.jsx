import React from "react";
import { useParams } from "react-router-dom";
import { QUERY_EVENT } from "../utils/queries";
import { REMOVE_PASSWORD } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const PasswordDelete = () => {
  let eventId = useParams().eventId;
  let id = useParams().id;
  const [removePassword, { err3 }] = useMutation(REMOVE_PASSWORD, {
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
        console.warn("Something went wrong");
      }
    },
  });
  const remove = async () => {
    await removePassword({
      variables: { id: id },
    });
    window.location.href = `/event/${eventId}/passwords`;
  };
  remove();

  return <div>Loading...</div>;
};

export default PasswordDelete;
