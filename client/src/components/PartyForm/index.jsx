import React, { useState, useEffect, createRef } from "react";
import { v4 as uuidv4 } from "uuid";
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

  class Schedule {
    constructor(id, name, start, end, color) {
      this.allDay = false;
      this.id = id;
      this.title = name;
      this.start = start;
      this.end = end;
      this.color = color;
    }
  }

  class EventSchedule extends Schedule {
    constructor(id, name, start, end, color) {
      super(id, name, start, end, color);
      this.editable = false;
    }
  }

  class GuestSchedule extends Schedule {
    constructor(id, name, start, end, color) {
      super(id, name, start, end, color);
      this.eventStartEditable = false;
      this.droppable = false;
    }
  }

  let eventId = useParams().id;

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId },
  });
  let start;
  if (!loading) {
    start = data.event.date_windows[0][0];
  }

  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState(null);
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [selectable, setSelectable] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [storedDates, setStoredDates] = useState(
    JSON.parse(localStorage.getItem("schedule"))
  );

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
    dateInput.forEach((date) => date_windows.push(date.dates)); // [[start, end], [start, end]...]
    let sortedWindows = date_windows.sort(
      ([a, b], [c, d]) => new Date(a) - new Date(c) || new Date(d) - new Date(b)
    );
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
          dateWindows: sortedWindows,
          role: guestRole,
          eventId: eventId,
          budget: Number(formState.budget),
        },
      });
      localStorage.removeItem("schedule");
      window.location.href = "/thankyou";
    } catch (e) {
      console.error(e);
    }
  };

  const handleDateSelect = (arg) => {
    let check;
    let thisId = uuidv4();
    let start = new Date(arg.startStr);
    start.setDate(start.getDate() + 1);
    let end = new Date(arg.endStr);
    for (let i = 0; i < dateInput.length; i++) {
      let arr = dateInput[i].dates;
      if (
        (arr.includes(start) && arr.includes(end)) ||
        (arg.dateStr && arr.includes(arg.dateStr))
      ) {
        check = false;
      } else {
        check = true;
      }
    }

    setAvailability(check, arg, start, end, thisId);
  };

  const setAvailability = (check, arg, start, end, thisId) => {
    if (check || !dateInput.length) {
      let guestSchedule = new GuestSchedule(
        thisId,
        "Your Availability",
        new Date(arg.start),
        new Date(arg.end),
        "#7fb7be"
      );
      let window = [start.toString(), end.toString()];
      if (!start && !end) window = [arg.dateStr];
      setDateInput((d) => [...d, { dates: window, id: thisId }]);
      if (!schedule.includes(guestSchedule)) {
        localStorage.setItem(
          "schedule",
          JSON.stringify([...schedule, guestSchedule])
        );
        setSchedule((d) => [...d, guestSchedule]);
      }
    }
    setSelectable(false);
  };

  const handleRemoveEvent = (info) => {
    let event = info.event;
    let eventId = event._def.publicId;
    let newArr = dateInput.filter((d) => d.id !== eventId);
    let newSchedule = schedule.filter((d) => d.id !== eventId);
    if (data.event._id !== eventId) {
      setDateInput(newArr);
      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      setSchedule(newSchedule);
      event.remove();
    }
  };
    
    useEffect(() => {
      if (sessionStorage.getItem("reloaded") === null) {
      // clears local storage if user exits the page
      localStorage.removeItem("schedule");
    }
    // session storage retains its values on refresh, but clears them upon exiting the page
    sessionStorage.setItem("reloaded", "yes");
  }, []);

  useEffect(() => {
    if (role !== "other") {
      setOtherRole(null);
    }
  }, [role]);

  useEffect(() => {
    if (position === 0) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [position]);

  useEffect(() => {
    if (storedDates) {
      if (storedDates.length > 0) {
        setSchedule([...storedDates]);
      } else {
        setSchedule([storedDates]);
      }
    }
  }, [storedDates]);

  useEffect(() => {
    if (!loading) {
      let arr = [];
      for (let i = 0; i < data.event.date_windows.length; i++) {
        arr.push(
          new EventSchedule(
            data.event._id,
            data.event.event_name,
            new Date(data.event.date_windows[i][0]),
            new Date(
              data.event.date_windows[i][data.event.date_windows[i].length - 1]
            ),
            "#8ca081"
          )
        );
        if (!storedDates) localStorage.setItem("schedule", JSON.stringify(arr));
      }
      setStoredDates(JSON.parse(localStorage.getItem("schedule")));
    }
  }, [loading]);

  return (
    <div className="my-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.event.passwords.length && !isPassword ? (
            <div className="password-center">
              <div className="uk-card uk-card-body card-centering">
                <h1 className="uk-card-title uk-text-center">
                  Enter password to access the survey
                </h1>
                <form onSubmit={handlePasswordSubmit}>
                  <input
                    className="form-input-margin"
                    placeholder="Password"
                    name="password"
                    type="text"
                    id="password"
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="form-input-margin button-border"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {position > 0 && (
                <button
                  className="form-input-margin button-border more-room"
                  onClick={(e) => setPosition(0)}
                >
                  Edit Availability
                </button>
              )}
              {position < 1 && (
                <button
                  className="form-input-margin button-border more-room"
                  onClick={(e) => setPosition(1)}
                >
                  Finish Survey
                </button>
              )}
              {position === 0 && (
                <div className="survey-instructions">
                  <p className="font-evnt-large">
                    <span className="emphasis">Tap the plus button</span> to be
                    able to select the days you're available.{" "}
                    <span className="emphasis">
                      Tap, hold, and drag on the calendar whitespace
                    </span>{" "}
                    to add availability. To remove an availability window{" "}
                    <span className="emphasis">
                      tap the blue bar you want removed.
                    </span>
                  </p>
                </div>
              )}
              {position === 0 ? (
                <>
                  <div className="calendar-container">
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      initialView="dayGridMonth"
                      selectable={selectable}
                      selectMirror={false}
                      dayMaxEvents={true}
                      weekends={true}
                      events={schedule}
                      timeZone={"UTC"}
                      nextDayThreshold={"00:00:00"}
                      displayEventTime={false}
                      select={handleDateSelect}
                      eventClick={handleRemoveEvent}
                      ref={calendarRef}
                      firstDay={1}
                      hiddenDays={[1, 2, 3, 4]}
                      initialDate={start}
                      longPressDelay="0"
                      eventLongPressDelay="0"
                      selectLongPressDelay="0"
                      eventDisplay="block"
                    />
                  </div>

                  {buttonVisible ? (
                    <div className="selectable-btn-container">
                      {!selectable ? (
                        <button
                          className="selectable-btn select"
                          onClick={() => setSelectable(true)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      ) : (
                        <button
                          className="selectable-btn unselect"
                          onClick={() => setSelectable(false)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
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
                      placeholder="Your budget?"
                      name="budget"
                      type="number"
                      id="budget"
                    />
                    <textarea
                      className="form-input-margin"
                      placeholder="Additional Information (not required)"
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
                  {error && (
                    <div className="error">Please enter required fields</div>
                  )}
                </div>
              )}
              {position < 1 && (
                <button
                  className="form-input-margin button-border"
                  onClick={(e) => setPosition(1)}
                >
                  Finish Survey
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PartyForm;
