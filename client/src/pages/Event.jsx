import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../components/Header";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  let guestArr = [];
  let event_id = useParams().id;
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: event_id },
  });

  class GuestAvailability {
    constructor(id, name, start, end) {
      this.id = id;
      this.title = name;
      this.start = start;
      this.end = end;
    }
  }

  const handleDateClick = (event) => {};

  const renderAvailability = () => {
    if (!loading) {
      data.event.guests.map((guest) => {
        let name = `${guest.first_name} ${guest.last_name}`;
        for (let i = 0; i < guest.date_windows.length; i++) {
          guestArr.push(
            new GuestAvailability(
              guest._id,
              name,
              new Date(guest.date_windows[i][0]),
              new Date(guest.date_windows[i][guest.date_windows[i].length - 1])
            )
          );
        }
      });
    }
  };

  renderAvailability();

  return (
    <div>
      <Header/>
      <NavBar event_id={event_id} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={guestArr}
        displayEventTime={false}
      />
    </div>
  );
};

export default Event;
