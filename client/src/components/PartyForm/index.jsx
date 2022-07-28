import React, { useState } from "react";
import pushDateWindows from "../../utils/dateConversion";
import { ADD_GUEST } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId },
  });

  const [role, setRole] = useState("");

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    role: "",
    dateWindows: "",
    budget: "",
    additionalInfo: "",
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
  if (!loading) console.log(data);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let dateWindows = pushDateWindows(dateInput); // [[],[],[]...]
    try {
      await addGuest({
        variables: {
          ...formState,
          dateWindows: dateWindows,
          role: role,
          eventId: eventId,
          budget: Number(formState.budget),
        },
      });
      window.location.href = "/thankyou";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="my-auto">
      <div className="uk-card uk-card-body card-centering">
        <h1 className="uk-card-title uk-text-center">
          Event name would go here
        </h1>
        <form
          className="form-centering form-input-margin"
          onSubmit={handleFormSubmit}
          onChange={handleChange}
        >
          <input
            className="form-input-margin"
            placeholder="First Name"
            name="firstName"
            type="text"
            id="firstName"
          />
          <input
            className="form-input-margin"
            placeholder="Last Name"
            name="lastName"
            type="text"
            id="lastName"
          />
          <select
            className="form-centering form-input-margin"
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
            <input
              className="form-centering form-input-margin"
              onChange={handleRoleChange}
              value={role}
              type="text"
              placeholder="Enter your role"
            />
          )}
          <button
            className="form-input-margin button-border"
            type="button"
            onClick={addInput}
          >
            Add Date Range
          </button>
          {dateInput.map((input, index) => (
            <span key={index}>
              {index % 2 === 0 && index !== 0 && (
                <div className="go-to-the-center">
                <button
                  className="form-input-margin button-border "
                  type="button"
                  onClick={removeInput}
                  id={`0${index}`}
                >
                  Delete
                </button>
                </div>
              )}
              <div>
                {index % 2 === 0 ? <span>From: </span> : <span> To: </span>}
                <input
                  className="form-input-margin"
                  onChange={handleDateChange}
                  value={input.value}
                  id={index}
                  type={input.type}
                />
              </div>
            </span>
          ))}
          <input
            className="form-input-margin"
            placeholder="Your budget? (plain numbers)"
            name="budget"
            type="number"
            id="budget"
          />
          <textarea
            className="form-input-margin"
            placeholder="Additional Information"
            name="additionalInfo"
            id="additionalInfo"
            rows="2"
            cols="22"
          ></textarea>
          <button className="form-input-margin button-border" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartyForm;
