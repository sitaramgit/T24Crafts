import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Avatar, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
import { httpService } from '../services/httpService';
import { API_REQUESTS } from '../common/apiRequests';
import { useSelector } from 'react-redux';
import CreateProfile from '../components/CreateProfile';
import { createPortal } from 'react-dom';
import ReactModal from '../common-ui/ReactModal';

// Styled Components
const ProfilePage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Cover = styled('div')({
  position: 'relative',
  width: '100%',
  height: '200px',
  backgroundImage: 'url(https://source.unsplash.com/random/800x200)',
  backgroundSize: 'cover',
  borderRadius: '15px 15px 0 0',
});

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  border: '2px solid white',
  position: 'absolute',
  top: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const ContentCard = styled(Card)({
  maxWidth: 400,
  marginTop: '60px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
});

const ThemeSwitcher = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
});

const ThemeIcon = styled('img')({
  width: '30px',
  height: '30px',
  margin: '0 5px',
});

const Profile = () => {
    const loggedUser = useSelector((state: any) => state.login.userDetails);
    console.log(loggedUser)
    const [showForm, setShowForm] = useState(false);
    
    return (
        <ProfilePage>
            <Cover>
                <StyledAvatar
                    alt="Samantha Jones"
                    // src="https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg"
                    src={loggedUser.socialPicture}
                />
            </Cover>

            <ContentCard>
                <CardContent>
                    <Typography variant="h4" align="center">
                    {`${loggedUser.firstName} ${loggedUser.firstName}`}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        New York, United States
                    </Typography>
                    <Typography variant="body1" align="center">
                        Web Producer - Web Specialist
                    </Typography>
                    <Typography variant="body2" align="center">
                        Columbia University - New York
                    </Typography>
                    <Box mt={2}>
                        <Grid container justifyContent="center">
                            <Grid size={4} textAlign="center">
                                <Typography variant="h6">65</Typography>
                                <Typography variant="body2">Friends</Typography>
                            </Grid>
                            <Grid size={4} textAlign="center">
                                <Typography variant="h6">43</Typography>
                                <Typography variant="body2">Photos</Typography>
                            </Grid>
                            <Grid size={4} textAlign="center">
                                <Typography variant="h6">21</Typography>
                                <Typography variant="body2">Comments</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>

                <ThemeSwitcher>
                    <Button variant="contained" color="primary">
                        Connect
                    </Button>
                    <Button variant="contained" color="secondary">
                        Message
                    </Button>
                </ThemeSwitcher>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="outlined" onClick={() => setShowForm(true) } >update Profile</Button>
                </Box>
            </ContentCard>

            <ThemeSwitcher>
                <span>Themes color:</span>
                <div>
                    <ThemeIcon src="path_to_theme_icon" alt="theme" />
                    {/* Add more theme icons as needed */}
                </div>
            </ThemeSwitcher>
            {showForm &&
                <ReactModal 
                onSave={() => { }} 
                content={<CreateProfile isShow={showForm} onClose={() => setShowForm(false)} />} 
                isShow={showForm} 
                onClose={() => setShowForm(false)} />
            }
            {/* {showForm && createPortal(
                <CreateProfile isShow={showForm} onClose={() => setShowForm(false)} />,
                document.body
            )} */}
        </ProfilePage>
    );
}
export default Profile