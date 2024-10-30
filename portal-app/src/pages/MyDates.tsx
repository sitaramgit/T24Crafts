import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid2';
import { Box, Fab, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Popover, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { API_REQUESTS } from '../common/apiRequests';
import { httpService } from '../services/httpService';
import { getCurrentMonthAndYear } from '../common/commonFunctions';

const localizer = momentLocalizer(moment);
 // Get today's date
 const today = new Date();
const MyDates = () => {
  const loggedUser = useSelector((state: any) => state.login.userDetails);
  console.log(loggedUser);
  const [selectedDates, setSelectedDates] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [profile, setProfileData] = useState<any>();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [tempDates, setTempDates] = useState<Date[]>([]);
  const [titleError, setTitleError] = useState(false);
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
  useEffect(() => {
    getProfile();
    getSchedules();
  }, [])

  const getSchedules = async () => {
    const { currentMonth, currentYear } = getCurrentMonthAndYear()
    API_REQUESTS.GET_SCHEDULE_BY_USER_ID_AND_DATE.URL_PARAMS = { userId: loggedUser.id, month: currentMonth, year: currentYear }
    try {
      const responce = await httpService(API_REQUESTS.GET_SCHEDULE_BY_USER_ID_AND_DATE);
      console.log(responce.data);
      const finalEvents: any = [];
      const excludeDates: any = []
      responce?.data?.forEach((item: any) => {
        finalEvents.push({
          title: item.productionTitle,
          start: new Date(item.workDate), // Start date of the event
          end: new Date(item.workDate), // End date (same day for one-day events)
        })
        excludeDates.push(new Date(item.workDate))
      });
      setDisabledDates(excludeDates)
      setEvents(finalEvents);
    } catch (error) {
      console.log(error)
    }
  }
  const getProfile = async () => {
    API_REQUESTS.GET_PROFILE_BY_USER_ID.URL_PARAMS.userId = loggedUser.id
    try {
      const data = await httpService(API_REQUESTS.GET_PROFILE_BY_USER_ID);
      setProfileData(data)
    } catch (error) {
      console.log(error)
    }
  }
  // Function to handle slot clicks
  const handleSelectSlot = (slot: any) => {
    console.log(slot);
    // const title = window.prompt('Enter Event Title');
    // if (title) {
    //   setEvents([
    //     ...events,
    //     {
    //       title,
    //       start,
    //       end,
    //     },
    //   ]);
    // }
  };



  // Function to handle opening the DatePicker overlay
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTempDates(selectedDates); // Copy selected dates to temporary state
  };

  // Function to handle closing the DatePicker overlay
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDates([]);
  };

  const handleNext = () => {
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
      setStep(2); // Move to date picker step
    }
  };

  const handleBack = () => {
    setStep(1); // Go back to title input step
  };

  // Handle OK button click
  const handleOk = async () => {
    console.log(selectedDates)
    const payload = {
      selectedDates,
      productionTitle: title,
      userId: loggedUser.id,
      createdBy: profile.role
    }
    console.log(payload)
    API_REQUESTS.CREATE_SCHEDULE.PAYLOAD = payload
    try {
      const data = await httpService(API_REQUESTS.CREATE_SCHEDULE);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    // setSelectedDates(tempDates); // Commit selected dates to main state
    handleClose();
  };

  // Handle Cancel button click
  const handleCancel = () => {
    handleClose(); // Simply close the overlay without saving changes
  };

  const handleDateChange = (dates: any) => {
    setSelectedDates(dates);
  };

  return (
    <Grid container spacing={2}>

      <Grid size={{ xs: 12, md: 8 }}>

        <Box sx={{ display: 'flex', mt: '5', justifyContent: 'space-between', alignItems: 'center' }}>
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
            {step === 1 && (
              <FormControl>
                <FormLabel htmlFor="title">Movie/Production name</FormLabel>
                <TextField
                  error={titleError}
                  helperText={titleError ? 'Enter production name' : ''}
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter production or movie name"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={titleError ? 'error' : 'primary'}
                />
              </FormControl>
            )}

            {step === 2 && (
              <DatePicker
                selectedDates={selectedDates}
                onChange={handleDateChange}
                inline
                selectsMultiple
                shouldCloseOnSelect={false}
                disabledKeyboardNavigation
                excludeDates={disabledDates} // Disable dates in this array
                minDate={today}
              />
            )}

            {/* Footer with Next, OK, Cancel, and Back buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              {step === 1 ? (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <>
                  <Button variant="outlined" onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => handleOk()}>
                    OK
                  </Button>
                </>
              )}
              <Button variant="outlined" onClick={handleClose}>
                Cancel
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
