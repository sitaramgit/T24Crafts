import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Avatar, Typography, Box, Slide, Dialog } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha, color, Stack, styled } from '@mui/system';
import { httpService } from '../services/httpService';
import { API_REQUESTS } from '../common/apiRequests';
import { useSelector } from 'react-redux';
import CreateProfile from '../components/CreateProfile';
import { createPortal } from 'react-dom';
import ReactModal from '../common-ui/ReactModal';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import { TransitionProps } from '@mui/material/transitions';
// Styled Components
const ProfilePage = styled('div')({
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
});

const Cover = styled('div')({
    // position: 'relative',
    // width: '100%',
    // height: '200px',
    // backgroundImage: 'url(https://source.unsplash.com/random/800x200)',
    // backgroundSize: 'cover',
    // borderRadius: '15px 15px 0 0',
});
const BgCover = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '125px',
    background: 'linear-gradient(90deg, rgba(242, 68, 71, 1) 35%, rgba(239, 179, 73, 1) 100%)',
    borderRadius: '15px 15px 0 0',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));
const ContentCard = styled(Card)({
    width: '65%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '2rem',
    '& .updateBtn': {
        background: 'linear-gradient(90deg, rgba(242, 68, 71, 1) 35%, rgba(239, 179, 73, 1) 100%)',
        borderRadius: '30px',
        padding: '12px 36px',
    },
    '& .MuiTypography-root': {
        color: alpha('#000', 0.65)
    }
});

const ThemeSwitcher = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    '& .MuiButton-root': {
        color: '#f24447',
        '&:nth-child(2)': {
            color: '#efb349'
        }
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '50px',
    },
}));

const ThemeIcon = styled('img')({
    width: '30px',
    height: '30px',
    margin: '0 5px',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '10rem',
    height: '10rem',
    border: '2px solid white',
    position: 'absolute',
    top: '60px',
    left: '50%',
    zIndex: 99,
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('sm')]: {
        width: '8rem',
        height: '8rem',
        top: '122px',
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
    const loggedUser = useSelector((state: any) => state.login.userDetails);
    console.log(loggedUser)
    const [showForm, setShowForm] = useState(false);
    return (
        <ProfilePage>
            <ContentCard>

                <Cover>

                    <StyledAvatar
                        alt="Samantha Jones"
                        // src="https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg"
                        src={loggedUser.socialPicture}
                    />
                    <BgCover />
                </Cover>


                <ThemeSwitcher>
                    <Button variant="text" disableRipple startIcon={<PeopleOutlineTwoToneIcon />}>
                        Connect
                    </Button>
                    <Button variant="text" disableRipple startIcon={<ForumTwoToneIcon />}>
                        Message
                    </Button>
                </ThemeSwitcher>


                <CardContent sx={{ padding: '0px' }}>
                    <Typography my={3} variant="h4" fontSize={{ xs: '26px', sm: '32px' }} align="center">
                        {`${loggedUser.firstName} ${loggedUser.lastName}`}
                    </Typography>
                    <Box mb={3}>
                        <Typography variant="subtitle1" align="center">
                            New York, United States
                        </Typography>
                        <Typography variant="body1" align="center">
                            Web Producer - Web Specialist
                        </Typography>
                        <Typography variant="body2" align="center">
                            Columbia University - New York
                        </Typography>
                    </Box>
                    <Box mb={3}>
                        <Stack direction={'row'} justifyContent="center" spacing={4}>
                            <Box textAlign="center">
                                <Typography variant="h6">65</Typography>
                                <Typography variant="body2">Friends</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">43</Typography>
                                <Typography variant="body2">Photos</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">21</Typography>
                                <Typography variant="body2">Comments</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button className='updateBtn' variant="contained" onClick={() => setShowForm(true)} >update Profile</Button>
                </Box>
                {/* <ThemeSwitcher>
                    <span>Themes color:</span>
                    <div>
                        <ThemeIcon src="path_to_theme_icon" alt="theme" />
                        Add more theme icons as needed
                    </div>
                </ThemeSwitcher> */}


            </ContentCard>
            {showForm && <Dialog
                fullScreen
                open={showForm}
                onClose={() => setShowForm(false)}
                TransitionComponent={Transition}
            >
                <CreateProfile isShow={showForm} onClose={() => setShowForm(false)} />
            </Dialog>}
            {/* {showForm &&
                <ReactModal
                    onSave={() => { }}
                    content={<CreateProfile isShow={showForm} onClose={() => setShowForm(false)} />}
                    isShow={showForm}
                    onClose={() => setShowForm(false)} />
            } */}

        </ProfilePage>
    );
}
export default Profile