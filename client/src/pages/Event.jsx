import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";

// single event page will have a calendar that shows the names of each person who is available on a given day.
const Event = () => {
  let guestArr = [];
  let event_id = useParams().id;
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: event_id },
  });

  class GuestAvailability {
    constructor(name, start, end) {
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
              name,
              guest.date_windows[i][0],
              guest.date_windows[i][guest.date_windows[i].length - 1]
            )
          );
        }
      });
      console.log(guestArr);
    }
  };

  renderAvailability();

  return (
    <div>
      <NavBar event_id={event_id} />
      <FullCalendar
        plugins={[dayGridPlugin, resourceTimelinePlugin]}
        // dateClick={handleDateClick}
        eventContent={() => renderEventContent(guestArr)}
      />
    </div>
  );

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
};

export default Event;
