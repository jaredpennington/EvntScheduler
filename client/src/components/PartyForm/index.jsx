import React, { useState } from "react";
import pushDateWindows from "../../utils/dateConversion";
import { ADD_GUEST } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom';

const PartyForm = () => {
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

  let eventId = useParams().id;

  const [role, setRole] = useState("");

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    role: "",
    date_windows: "",
    budget: ""
  });
  const [dateInput, setDateInput] = useState(inputArr);

  const [addGuest, { error }] = useMutation(ADD_GUEST, {
    update(cache, { data: { addGuest } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });

        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: { ...event, guests: [...event.events, addGuest] } },
        });
      } catch (e) {
        console.warn("First folder insertion by user!");
      }
      if (error) throw error;
    },
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
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
  };

  const removeInput = (event) => {
    let index = Number(event.target.id.charAt(1)); // 02 -> 2
    let arr = dateInput.filter((d, i) => i !== index && i !== index + 1);
    setDateInput(arr);
  };

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
      await addGuest({
        variables: { ...formState, date_windows: dateWindows, invitedTo: "wedding", role: role, eventId: eventId, budget: Number(formState.budget) },
      });
      window.location.href = "/thankyou";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="border-black container rounded-md mx-auto px-40 my-4 box-border border-4 h-screen  ">
      <div className="text-2xl flex justify-center inline-block ">
        <h1>Event name would go here</h1>
        <form onSubmit={handleFormSubmit} onChange={handleChange}>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            id="firstName"
          />
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            id="lastName"
          />
          <select
            onChange={handleRoleChange}
            value={role}
            id="role"
            name="role"
          >
            <option value="role">Role for the event</option>
            <option value="bridesmaid">Bridesmaid</option>
            <option value="guest">Guest</option>
            <option value="other">Other</option>
          </select>
          {role === "other" && (
            <input onChange={handleRoleChange} value={role} type="text" placeholder="Enter your role" />
          )}
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
          <input
            placeholder="Your budget? (plain numbers)"
            name="budget"
            type="number"
            id="budget"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PartyForm;
