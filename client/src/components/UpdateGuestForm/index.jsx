import React, { useState, useEffect } from "react";
import pushDateWindows from "../../utils/dateConversion";
import { UPDATE_GUEST } from "../../utils/mutations";
import { QUERY_EVENT, QUERY_GUEST } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const UpdateGuestForm = () => {
  let eventId = useParams().eventId;
  let guestId = useParams().id;

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId },
  });
  const [role, setRole] = useState('');
  const [roleOptions, setRoleOptions] = useState([]);
  const [guest, setGuest] = useState({
    first_name: "",
    last_name: "",
    role: "",
    budget: "",
    additional_info: "",
  });

  let roles = [
    {
      value: "role",
      selector: "Role for the event",
    },
    {
      value: "bridesmaid",
      selector: "Bridesmaid",
    },
    {
      value: "guest",
      selector: "Guest",
    },
    {
      value: "other",
      selector: "Other",
    },
  ];

  const [formState, setFormState] = useState({
    firstName: () => {
      if (!loading) return guest.first_name;
    },
    lastName: () => {
      if (!loading) return guest.last_name;
    },
    role: () => {
      if (!loading) return guest.role;
    },
    dateWindows: "",
    budget: () => {
      if (!loading) return guest.budget;
    },
    additionalInfo: () => {
      if (!loading) return guest.additional_info;
    },
  });
  const [dateInput, setDateInput] = useState([]);

  const [updateGuest, { error }] = useMutation(UPDATE_GUEST, {
    update(cache, { data: { updateGuest } }) {
      try {
        const { event } = cache.readQuery({ query: QUERY_EVENT });

        cache.writeQuery({
          query: QUERY_EVENT,
          data: { event: { ...event, guests: [...event.events, updateGuest] } },
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
      await updateGuest({
        variables: {
          ...formState,
          id: guestId,
          dateWindows: dateWindows,
          role: role,
          budget: Number(formState.budget),
        },
      });
      window.location.href = `/event/${eventId}/guests`;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let inputArr = [];
    let index = 0;
    if (!loading) {
      let thisGuest = data.event.guests.filter((guest) => guest._id === guestId)[0];
      setGuest(thisGuest);
      thisGuest.date_windows.map((date) => {
        for (let i = 0; i < date.length; i++) {
          inputArr.push({
            type: "date",
            value: date[i],
            id: index,
          });
          index++;
        }
      });
      while(roles[0].value !== thisGuest.role) {
        let first = roles[0];
        roles.shift();
        roles.push(first);
      }
      setRoleOptions(roles);
    }
    setDateInput(inputArr);
  }, [loading, guest]);

  return (
    <div>
      {loading || !guest ? (
        <div>Loading...</div>
      ) : (
        <div className="my-auto">
          <div className="uk-card uk-card-body card-centering">
            <h1 className="uk-card-title uk-text-center">
              {data.event.event_name}
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
                defaultValue={guest.first_name}
              />
              <input
                className="form-input-margin"
                placeholder="Last Name"
                name="lastName"
                type="text"
                id="lastName"
                defaultValue={guest.last_name}
              />
              <select
                className="form-centering form-input-margin"
                onChange={handleRoleChange}
                value={role}
                id="role"
                name="role"
              >
                {roleOptions.map((role, index) => (
                    <option key={index} value={role.value}>{role.selector}</option>
                ))}
              </select>
              {role === "other" && (
                <input
                  className="form-centering form-input-margin"
                  onChange={handleRoleChange}
                  type="text"
                  defaultValue={guest.role}
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
                defaultValue={guest.budget}
              />
              <textarea
                className="form-input-margin"
                placeholder="Additional Information"
                name="additionalInfo"
                id="additionalInfo"
                rows="2"
                cols="22"
                defaultValue={guest.additional_info}
              ></textarea>
              <button className="form-input-margin button-border" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateGuestForm;
