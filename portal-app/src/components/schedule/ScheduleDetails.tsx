import { memo } from "react"
import { Typography, Box, Container, IconButton, AppBar, Toolbar, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IScheduleDetails {
    scheduleDetails: any;
    onClose: () => any;
}
const ScheduleDetails = ({ scheduleDetails, onClose }: IScheduleDetails) => {
    return (<Box>
        <Box sx={{ flexGrow: 1 }} mb={3}>
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onClose}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {scheduleDetails?.workDate}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <Grid container>
            <Grid size={{ md: 3, sm: 0 }}></Grid>
            <Grid size={{ md: 6, sm: 12 }}>
                <Container >
                    <Paper elevation={3} sx={{ marginTop: 2, padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6">{scheduleDetails.title}</Typography>
                        <Typography><strong>Production Title:</strong> {scheduleDetails.productionTitle}</Typography>
                        <Typography><strong>Work Date:</strong> {scheduleDetails.workDate}</Typography>
                        <Typography><strong>Hours Worked:</strong> {scheduleDetails.hoursWorked}</Typography>
                        <Typography><strong>Created By:</strong> {scheduleDetails.createdBy}</Typography>
                        <Typography><strong>Created At:</strong> {new Date(scheduleDetails.createdAt).toLocaleString()}</Typography>
                        <Typography><strong>Updated At:</strong> {new Date(scheduleDetails.updatedAt).toLocaleString()}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            <IconButton onClick={() => { }} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => { }} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Container>
            </Grid>
            <Grid size={{ md: 3, sm: 0 }}></Grid>
        </Grid>
    </Box>)
}

export default memo(ScheduleDetails)