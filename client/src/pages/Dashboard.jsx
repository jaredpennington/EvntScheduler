import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../utils/queries";
import { REMOVE_EVENT } from "../utils/mutations";
import dateFormat from "../utils/dateFormat";
import { Link } from "react-router-dom";
import EditDeleteSelectors from "../components/EditDeleteSelectors";
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

  renderSchedule();

  return (
    <div className="uk-child-width-expand@s uk-text-center grid-three">
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.events.map((event, index) => (
          // put card styling in this div VVV
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
                  <Link to={`/event/${event._id}`}>{event.event_name}</Link>
                </div>
                <div>
                  Guests:{" "}
                  {Object.keys(event.guests).length
                    ? Object.keys(event.guests).length
                    : "none"}
                </div>
                <div>
                  Passwords:{" "}
                  {Object.keys(event.passwords).length
                    ? Object.keys(event.passwords).length
                    : "none"}
                </div>
                <div>Considered dates for event: </div>
                {Object.values(event.date_windows).map((date, index) => (
                  <div key={index}>
                    {formatDate(date[0], dateFormat)} -{" "}
                    {formatDate(date[date.length - 1], dateFormat)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
      {!loading ? (
        // Add small card here for this button thing VVV
        <div>
          <Link to="event/create">Click here to make an event!</Link>
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
