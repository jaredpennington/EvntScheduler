import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  let calendarEl = document.getElementById("icalendar");
  let calendar;
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
      // console.log(guestArr);
      // calendar = new Calendar(calendarEl, {
      //   timeZone: 'EST',
      //   events: guestArr
      // });
      // calendar.render();
    }
  };

  renderAvailability();

  // calendar = new Calendar(calendarEl, {
  //   timeZone: 'UTC',
  //   events: [
  //     {
  //       id: 'a',
  //       title: 'my event',
  //       start: '2018-09-01'
  //     }
  //   ]
  // })

  // var event = calendar.getEventById('a') // an event object!
  // var start = event.start // a property (a Date object)
  // console.log(start.toISOString()) // "2018-09-01T00:00:00.000Z"

  return (
    <div>
      <NavBar event_id={event_id} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={guestArr}
      />
    </div>
  );

  function renderEventContent(eventInfo) {
    console.log(eventInfo);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
};

export default Event;
