import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid2';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Popover, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = momentLocalizer(moment);

const MyDates = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tempDates, setTempDates] = useState<Date[]>([]);
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



  // Function to handle opening the DatePicker overlay
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTempDates(selectedDates); // Copy selected dates to temporary state
  };

  // Function to handle closing the DatePicker overlay
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle date selection change
  const handleDateChange = (dates: Date[]) => {
    setTempDates(dates); // Update temporary dates on selection
  };

  // Handle OK button click
  const handleOk = () => {
    console.log(selectedDates)
    // setSelectedDates(tempDates); // Commit selected dates to main state
    handleClose();
  };

  // Handle Cancel button click
  const handleCancel = () => {
    handleClose(); // Simply close the overlay without saving changes
  };

  const onChange = (dates: any) => {
    setSelectedDates(dates);
  };

  return (
    <Grid container spacing={2}>
     
  <Grid size={{ xs: 12, md: 8 }}>

  <Box sx={{ display: 'flex', mt:'5', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Your Dates</Typography>
        <Fab variant="extended" onClick={handleOpen}>
          <AddIcon sx={{ mr: 1 }} />
          Schedule
        </Fab>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={2}>
          <DatePicker
             selectedDates={selectedDates}
            onChange={onChange}
            inline
            selectsMultiple
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
          />
          
          {/* Footer with OK and Cancel buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleOk}>
              OK
            </Button>
          </Box>
        </Box>
      </Popover>
  
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
    </Grid>
</Grid>
  );
};

export default MyDates;
