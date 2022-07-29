import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../utils/queries";
import { REMOVE_EVENT } from "../utils/mutations";
import dateFormat from "../utils/dateFormat";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";
import EditDeleteSelectors from "../components/EditDeleteSelectors";
import Header from "../components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/core";

// the homepage if the user is logged in. Will include all the user's events
const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  let eventArr = [];

  const [removeEvent, { err }] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, removeEvent] } },
        });
      } catch (e) {
        console.warn("Something went wrong");
      }
    },
  });

  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };

  class Schedule {
    constructor(id, name, start, end) {
      this.id = id;
      this.title = name;
      this.start = start;
      this.end = end;
    }
  }

  const renderSchedule = () => {
    if (!loading) {
      data.events.map((event) => {
        for (let i = 0; i < event.date_windows.length; i++) {
          eventArr.push(
            new Schedule(
              event._id,
              event.event_name,
              new Date(event.date_windows[i][0]),
              new Date(event.date_windows[i][event.date_windows[i].length - 1])
            )
          );
        }
      });
    }
  };

  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) =>
    first === undefined ? "" : first.toLocaleUpperCase(locale) + rest.join("");

  let userData = AuthService.getProfile().data;
  let name = `${capitalizeFirstLetter(
    userData.first_name
  )} ${capitalizeFirstLetter(userData.last_name)}`;

  renderSchedule();

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <div className="nav-bar">
            <div className="nav-bar-links">
              <button className="nav-bar-single" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
          <div className="uk-child-width-expand@s uk-text-center grid-three">
            <div className="persons-event">{name}'s Events:</div>
            <Link className="button-border form-input-margin event-card-padding" to="event/create">Click here to make an event!</Link>
            {data.events.map((event, index) => (
              <div key={index}>
                <div className="uk-card-body event-card-centering uk-card uk-card-default dashboard-cards">
                  <div className="uk-card-title uk-text-center ">
                    <EditDeleteSelectors
                      eventId={event._id}
                      guestId={null}
                      passwordId={null}
                      removeEvent={removeEvent}
                    />
                    <div className="uk-card-title">
                      <Link className="link-color" to={`/event/${event._id}`}>{event.event_name}</Link>
                    </div>
                    <div>
                      <Link className="link-color" to={`/event/${event._id}/guests`}>Guests</Link>:{" "}
                      {Object.keys(event.guests).length
                        ? Object.keys(event.guests).length
                        : "none"}
                    </div>
                    <div>
                      <Link className="link-color" to={`/event/${event._id}/passwords`}>
                        Passwords
                      </Link>
                      :{" "}
                      {Object.keys(event.passwords).length
                        ? Object.keys(event.passwords).length
                        : "none"}
                    </div>
                    <div>
                      Considered <Link className="link-color" to={`/event/${event._id}`}>dates</Link>{" "}
                      for event:{" "}
                    </div>
                    {Object.values(event.date_windows).map((date, index) => (
                      <div key={index}>
                        {formatDate(date[0], dateFormat)} -{" "}
                        {formatDate(date[date.length - 1], dateFormat)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {!loading ? (
        <div>
          
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={eventArr}
            displayEventTime={false}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
