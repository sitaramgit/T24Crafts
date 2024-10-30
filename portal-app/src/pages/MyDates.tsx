import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid2';
import { Box, Dialog, Fab, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Popover, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { API_REQUESTS } from '../common/apiRequests';
import { httpService } from '../services/httpService';
import { getCurrentMonthAndYear } from '../common/commonFunctions';
import CreateSchedule from '../components/schedule/CreateSchedule';
import ScheduleDetails from '../components/schedule/ScheduleDetails';
import { Transition } from './Profile';

const localizer = momentLocalizer(moment);
 // Get today's date
 const today = new Date();
const MyDates = () => {
  const loggedUser = useSelector((state: any) => state.login.userDetails);
  const [selectedDates, setSelectedDates] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [profile, setProfileData] = useState<any>();
  const [tempDates, setTempDates] = useState<Date[]>([]);
  const [events, setEvents] = useState([]);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);

  useEffect(() => {
    getProfile();
    getSchedules();
  }, [])

  const getSchedules = async () => {
    const { currentMonth, currentYear } = getCurrentMonthAndYear()
    API_REQUESTS.GET_SCHEDULE_BY_USER_ID_AND_DATE.URL_PARAMS = { userId: loggedUser.id, month: currentMonth, year: currentYear }
    try {
      const responce = await httpService(API_REQUESTS.GET_SCHEDULE_BY_USER_ID_AND_DATE);
      const finalEvents: any = [];
      const excludeDates: any = []
      responce?.data?.forEach((item: any) => {
        finalEvents.push({
          title: item.productionTitle,
          start: new Date(item.workDate), // Start date of the event
          end: new Date(item.workDate), // End date (same day for one-day events)
          ...item
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
  const handlePopupClose = () => {
    setAnchorEl(null);
    setSelectedDates([]);
  };
  const handleEventClick = (event: any) => {
    console.log(event)
    setShowScheduleDetails(event);
    // setSelectedEvent(event);
    // setEventTitle(event.title);
  };
  const closeScheduleDetails = useCallback(()=>  setShowScheduleDetails(false),[])
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
        <CreateSchedule handleClose={handlePopupClose} params={{profile, loggedUser, disabledDates}} anchorEl={anchorEl} />

        <div style={{ height: '100vh', maxWidth: '100%', overflowX: 'auto' }}>
          <Calendar
            localizer={localizer}
            events={events}
            defaultView="month"
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick} // Handle event click
            style={{ minHeight: '100%', maxWidth: '100%' }}
          />
        </div>
        {showScheduleDetails && <Dialog
    fullScreen
    open={showScheduleDetails}
    onClose={() => setShowScheduleDetails(false)}
    TransitionComponent={Transition}
>
    <ScheduleDetails scheduleDetails={showScheduleDetails} onClose={closeScheduleDetails} />
</Dialog>}
      </Grid>
    </Grid>
  );
};

export default MyDates;
