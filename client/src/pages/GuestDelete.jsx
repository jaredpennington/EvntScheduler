import React from "react";
import { useParams } from "react-router-dom";
import { QUERY_EVENT } from "../utils/queries";
import { REMOVE_GUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const GuestDelete = () => {
  let eventId = useParams().eventId;
  let id = useParams().id;
  const [removeGuest, { err2 }] = useMutation(REMOVE_GUEST, {
    update(cache, { data: { removeGuest } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });

        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: { ...event, guests: [...event.guests, removeGuest] } },
        });
      } catch (e) {
        console.warn("Something went wrong");
      }
    },
  });

  const remove = async () => {
    await removeGuest({
      variables: { id: id },
    });
    window.location.href = `/event/${eventId}/guests`;
  };
  remove();

  return <div>Loading...</div>;
};

export default GuestDelete;
