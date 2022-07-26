import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import pushDateWindows from "../../utils/dateConversion";

const EventForm = () => {
  const inputArr = [
    {
      type: "date",
      value: "",
      id: 0,
    },
    {
      type: "date",
      value: "",
      id: 1,
    },
  ];

  const [formState, setFormState] = useState({
    eventName: "",
    date_windows: "",
  });
  const [dateInput, setDateInput] = useState(inputArr);

  let profileData = AuthService.getProfile();
  let userId = profileData.data._id;

  const addInput = () => {
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
    console.log(dateInput);
  };

  const removeInput = (event) => {
    let index = Number(event.target.id.charAt(1)); // 02 -> 2
    let arr = dateInput.filter((d, i) => i !== index && i !== index + 1);
    setDateInput(arr);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let dateWindows = pushDateWindows(dateInput); // [[],[],[]...]
    try {
      await addEvent({
        variables: { ...formState, user_id: userId, date_windows: dateWindows },
      });
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
    <div className="flex h-screen justify-center items-center">
      <div className="">
        <form onChange={handleChange} onSubmit={handleFormSubmit}>
          <input
            className=""
            placeholder="Event Name"
            name="event_name"
            type="text"
            id="event_name"
          />
          <button type="button" onClick={addInput}>
            +
          </button>
          {dateInput.map((input, index) => (
            <span key={index}>
              {index % 2 === 0 && index !== 0 && (
                <button
                  type="button"
                  onClick={removeInput}
                  id={`0${index}`}
                >
                  x
                </button>
              )}
              <input
                onChange={handleDateChange}
                value={input.value}
                id={index}
                type={input.type}
              />
            </span>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EventForm;
