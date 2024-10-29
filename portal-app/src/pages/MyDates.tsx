import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyDates = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Meeting',
      start: new Date(2024, 9, 31, 10, 0), // Oct 31, 2024, 10:00 AM
      end: new Date(2024, 9, 31, 11, 0),   // Oct 31, 2024, 11:00 AM
    },
    {
      title: 'Lunch Break',
      start: new Date(2024, 9, 31, 12, 0),
      end: new Date(2024, 9, 31, 13, 0),
    },
  ]);

  // Function to handle slot clicks
  const handleSelectSlot = ({ start, end }: any) => {
    const title = window.prompt('Enter Event Title');
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start,
          end,
        },
      ]);
    }
  };

  return (
    <div style={{ height: '100vh', maxWidth: '100%', overflowX: 'auto' }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ minHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
};

export default MyDates;
