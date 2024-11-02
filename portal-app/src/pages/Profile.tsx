import React, { useCallback, useEffect, useState } from 'react';
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
import BackButton from '../common-ui/BackButton';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useWebSocket from '../common/sockets/web-socket';
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

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
    const loggedUser = useSelector((state: any) => state.login.userDetails);
    const navigate = useNavigate();
    const routerParams: any = useParams();
    const [showForm, setShowForm] = useState(false);
    const [profile, setProfileData] = useState<any>();
    const [status, setStatus] = useState('Pending');
    const closeForm = useCallback(()=>  setShowForm(false),[])
    const [isRequesting, setIsRequesting] = useState(false);
    const handleStatusUpdate = (requestId: any, newStatus: any) => {
        console.log(requestId, newStatus)
        setStatus(newStatus);
      };
    
      // Always call useWebSocket at the top level with `isRequesting`
    useWebSocket(loggedUser.id, 'manager', handleStatusUpdate, isRequesting);

    useEffect(() => {
        getProfile();
    }, [routerParams.id])



    const navigateToMyDates = () => {
        navigate(`/dates/${loggedUser.id}`);
    }

    const getProfile = async () => {
        API_REQUESTS.GET_PROFILE_BY_USER_ID.URL_PARAMS.userId = routerParams.id
        try {
          const data = await httpService(API_REQUESTS.GET_PROFILE_BY_USER_ID);
          setProfileData(data)
        } catch (error) {
          console.log(error)
        }
      }

    
      const requestForDates = async () => {
        setIsRequesting(true);  // Trigger WebSocket connection by setting `isRequesting` to true
        console.log('Request for Dates initiated');

        API_REQUESTS.CREATE_DATE_REQUEST.URL_PARAMS = {
            artistId: profile.userId,  // Assuming profile holds the artist details
            managerId: loggedUser.id // Assuming loggedUser holds the manager details
        }
        try {
          const data = await httpService(API_REQUESTS.CREATE_DATE_REQUEST);
          console.log(data)
        //   setProfileData(data)
        } catch (error) {
          console.log(error)
        }
      };
      console.log(routerParams.id , loggedUser.id )
    return (
        <Box>
        <BackButton/>
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
                        {routerParams.id == loggedUser.id ? (<Button variant="text" onClick={navigateToMyDates} disableRipple startIcon={<PeopleOutlineTwoToneIcon />}>
                            My Dates
                        </Button>) : (<Button variant="text" onClick={requestForDates} disableRipple startIcon={<PeopleOutlineTwoToneIcon />}>
                            {status === 'Pending' ? 'Request for Dates' : status}
                        </Button>)}
                    
                    <Button variant="text" disableRipple startIcon={<ForumTwoToneIcon />}>
                        Message
                    </Button>
                </ThemeSwitcher>


                <CardContent sx={{ padding: '0px' }}>
                    <Typography my={3} variant="h4" fontSize={{ xs: '26px', sm: '32px' }} align="center">
                        {`${profile?.firstname} ${profile?.lastname}`}
                    </Typography>
                    <Box mb={3}>
                        <Typography variant="subtitle1" align="center">
                            {loggedUser.email}
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
                <CreateProfile isShow={showForm} onClose={closeForm} />
            </Dialog>}
            {/* {showForm &&
                <ReactModal
                    onSave={() => { }}
                    content={<CreateProfile isShow={showForm} onClose={() => setShowForm(false)} />}
                    isShow={showForm}
                    onClose={() => setShowForm(false)} />
            } */}

        </ProfilePage>
        </Box>
    );
}
export default Profile