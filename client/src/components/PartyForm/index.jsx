import React, { useState, useEffect, createRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ADD_GUEST } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const PartyForm = () => {
  const calendarRef = createRef();

  let eventArr = [];

  let eventId = useParams().id;

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId },
  });

  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState(null);
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [index, setIndex] = useState(0);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    role: "",
    dateWindows: "",
    budget: "",
    additionalInfo: "",
  });
  const [dateInput, setDateInput] = useState([]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormState({
      firstName: "",
      lastName: "",
      role: "",
      dateWindows: "",
      budget: "",
      additionalInfo: "",
    });
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const passwords = data.event.passwords;
    for (let i = 0; i < passwords.length; i++) {
      if (passwords[i].password.match(password)) {
        setIsPassword(true);
        break;
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let date_windows = [];
    dateInput.forEach(date => date_windows.push(date.dates));
    let guestRole;
    if (role === "other") {
      guestRole = otherRole;
    } else {
      guestRole = role;
    }
    try {
      await addGuest({
        variables: {
          ...formState,
          dateWindows: date_windows,
          role: guestRole,
          eventId: eventId,
          budget: Number(formState.budget),
        },
      });
      window.location.href = "/thankyou";
    } catch (e) {
      console.error(e);
    }
  };

  const handleDateSelect = (arg) => {
    let check;
    let thisId = uuidv4();
    let calendarApi = calendarRef.current.getApi();
    for (let i = 0; i < dateInput.length; i++) {
      let arr = dateInput[i].dates;
      if (arr.includes(arg.startStr) && arr.includes(arg.endStr)) {
        check = false;
      } else if((arr.includes(arg.startStr) && !arr.includes(arg.endStr)) || (!arr.includes(arg.startStr) && arr.includes(arg.endStr))) {
        setDateInput(d => d.filter((_, index) => index !== i));
        check = true;
        let replace = calendarApi.getEventById(dateInput[i].id);
        replace.remove();
      } else {
        check = true;
      }
    }

    if (check || !dateInput.length) {
      let guestSchedule = new Schedule(
        thisId,
        "Your Availability",
        new Date(arg.startStr),
        new Date(arg.endStr),
        "#7fb7be"
      );
      setDateInput((d) => [...d, {dates: [arg.startStr, arg.endStr], id: thisId}]); // [[start, end], [start, end]...]
      calendarApi.addEvent(guestSchedule);
      setIndex((i) => i++);
    }
  };

  class Schedule {
    constructor(id, name, start, end, color) {
      this.id = id;
      this.title = name;
      this.start = start;
      this.end = end;
      this.color = color;
    }
  }

  useEffect(() => {
    if (role !== "other") {
      setOtherRole(null);
    }
  }, [role]);

  useEffect(() => {
    if (!loading) {
      for (let i = 0; i < data.event.date_windows.length; i++) {
        eventArr.push(
          new Schedule(
            data.event._id,
            data.event.event_name,
            new Date(data.event.date_windows[i][0]),
            new Date(
              data.event.date_windows[i][data.event.date_windows[i].length - 1]
            ),
            "#8ca081"
          )
        );
      }
      setSchedule(eventArr);
    }
  }, [loading]);

  return (
    <div className="my-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.event.passwords.length && !isPassword ? (
            <div>
              <h1>Enter password to access the survey</h1>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  className="form-input-margin"
                  placeholder="Password"
                  name="password"
                  type="text"
                  id="password"
                  onChange={handlePasswordChange}
                  // autoComplete="off"
                />
                <button
                  className="form-input-margin button-border"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <>
              {position > 0 && (
                <button onClick={(e) => setPosition(0)}>Back</button>
              )}
              {position < 1 && (
                <button onClick={(e) => setPosition(1)}>Next</button>
              )}
              {position === 0 && (
                <div>
                  <p>
                    Click and drag to select the dates you are available for the
                    event:
                  </p>
                </div>
              )}
              {position === 0 ? (
                <div>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    events={schedule}
                    displayEventTime={false}
                    select={handleDateSelect}
                    ref={calendarRef}
                  />
                </div>
              ) : (
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
                      onChange={(e) => setRole(e.target.value)}
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
                        onChange={(e) => setOtherRole(e.target.value)}
                        value={otherRole}
                        type="text"
                        placeholder="Enter your role"
                      />
                    )}
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
                    <button
                      className="form-input-margin button-border"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
              {position < 1 && (
                <button onClick={(e) => setPosition(1)}>Next</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PartyForm;
