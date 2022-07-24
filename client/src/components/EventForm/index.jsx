import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import getAllDates from "../../utils/getAllDates";

const EventForm = () => {
  const [formState, setFormState] = useState({
    event_name: "",
    date_windows: "",
  });

  let dateWindows = [];
  let profileData = AuthService.getProfile();
  let userId = profileData.data._id;

  console.log(userId);

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, addEvent] } },
        });
      } catch (e) {
        console.warn("First folder insertion by user!");
      }
      if (error) throw error;
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
      await addEvent({
        variables: { ...formState, user_id: userId, date_windows: dateWindows },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="">
      <div className="">
        <form onChange={handleChange} onSubmit={handleFormSubmit}>
          <input
            className=""
            placeholder="Event Name"
            name="event_name"
            type="event_name"
            id="event_name"
          />
          
        </form>
      </div>
    </div>
  );
};

export default EventForm;
