import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import getAllDates from "../../utils/getAllDates";
import DateRangeInput from "../DateRangeInput";

const EventForm = () => {
  const inputArr = [
    {
      type: "date",
      value: "",
    },
    {
      type: "date",
      value: "",
    },
  ];

  const [formState, setFormState] = useState({
    eventName: "",
    date_windows: "",
  });
  const [dateInput, setDateInput] = useState(inputArr);

  let dateWindows = [];
  let profileData = AuthService.getProfile();
  let userId = profileData.data._id;

  const addInput = () => {
    console.log(dateInput);
    setDateInput((d) => {
      return [
        ...d,
        {
          type: "date",
          value: "",
        },
        {
          type: "date",
          value: "",
        },
      ];
    });
  };

  const handleDateChange = (event) => {
    event.preventDefault();

    const index = event.target.id;
    setDateInput((d) => {
      const newArr = d.slice();
      newArr[index].value = event.target.value;

      return newArr;
    });
  };

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

  const pushDateWindows = () => {
    for(let i = 0; i < dateInput.length; i++) {
        if (i % 2 === 0) continue;
        let start = dateInput[i-1].value; // 0, 2, 4...
        let end = dateInput[i].value; // 1, 3, 5...
        // result: (0,1), (2,3), (4,5), etc.
        dateWindows.push(getAllDates(start, end));
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    pushDateWindows();
    try {
      await addEvent({
        variables: { ...formState, user_id: userId, date_windows: dateWindows },
      });
      window.redirect('/')
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
          <button type="button" className="cursor-pointer" onClick={addInput}>
            +
          </button>
          {inputArr.map((input, index) => (
            <input
              onChange={handleDateChange}
              value={input.value}
              id={index}
              key={index}
              type={input.type}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
