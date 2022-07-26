import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
// import EventCalendar from "react-event-calendar";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  const [calendarDates, setCalendarDates] = useState("");
  let dateArr = [];
  class CalendarGuest {
    constructor(start, end, title, description, data) {
      this.start = start;
      this.end = end;
      this.title = title;
      this.description = description;
      this.data = data;
    }
  }

  let event_id = useParams().id;
  console.log(window.location.pathname.split("/")[2]);
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: event_id },
  });

  const getCalendarDates = () => {
    if (!loading) {
      console.log(data.event.guests[0].date_windows[0][0]);
      data.event.guests.map((guest) => {
        let name = `${guest.firstname} ${guest.lastname}`;
        let last = guest.date_windows.length - 1;
        dateArr.push(
          new CalendarGuest(
            guest.date_windows[0][0],
            guest.date_windows[last][last],
            name,
            {
              availability: guest.date_windows,
              invited_to: guest.invited_to,
              role: guest.role,
              budget: guest.budget,
            }
          )
        );
      });
      console.log(dateArr);
    }
  };

  getCalendarDates();

  return (
    <div>
      <NavBar event_id={event_id} />
      {/* <EventCalendar /> */}
    </div>
  );
};

export default Event;
