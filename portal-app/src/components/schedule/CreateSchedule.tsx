import { memo, useState } from "react";
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import { Popover, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import { API_REQUESTS } from "../../common/apiRequests";
import { httpService } from "../../services/httpService";
 // Get today's date
 const today = new Date();
 interface ICreateSchedule {

    anchorEl: HTMLElement | null;
    handleClose: () => any;
    params: {
        profile: any;
        loggedUser: any;
        disabledDates: any;
    }
 }
const CreateSchedule = ({params, anchorEl, handleClose}: ICreateSchedule) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

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
          userId: params.loggedUser.id,
          createdBy: params.profile.role
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

    return (<>
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
                excludeDates={params.disabledDates} // Disable dates in this array
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
    </>)
}
export default memo(CreateSchedule)