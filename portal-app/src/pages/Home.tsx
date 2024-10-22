import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Box, IconButton, Container, Avatar } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const loggedUser = useSelector((state: any) => state.login.userDetails);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar for the top navigation */}
          <AppBar position="static" color='inherit' sx={{ mb: 3 }}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box>
                    T24Crafts
                  </Box>
                  <Box>

                    <MessageIcon/>
                    <NotificationsIcon />
                  </Box>
              </Box>
          </AppBar>

      {/* Responsive Grid layout */}
      <Container>
        <Grid2 container spacing={2} justifyContent="center">
          {/* Left Sidebar (Hidden on small screens) */}
          <Grid2 size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ bgcolor: '#f0f0f0', p: 2, height: '100vh' }}>
              <Typography variant="h6" align="center">
                Left Sidebar
              </Typography>
              {/* Sidebar content like profile icons, links */}
            </Box>
          </Grid2>

          {/* Main Content (Feed) */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ bgcolor: '#fff', p: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Feed
              </Typography>
              {/* Feed content - example post cards */}
              <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '10px' }}>
                <Typography variant="body1">Post #1</Typography>
              </Box>
              <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '10px' }}>
                <Typography variant="body1">Post #2</Typography>
              </Box>
              {/* More posts */}
            </Box>
          </Grid2>

          {/* Right Sidebar (Hidden on small screens) */}
          <Grid2 size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ bgcolor: '#f0f0f0', p: 2, height: '100vh' }}>
              <Typography variant="h6" align="center">
                Right Sidebar
              </Typography>
              {/* Right sidebar content like user suggestions */}
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={'Recents'}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <Avatar alt="Remy Sharp" onClick={() => navigate('/profile')} src={loggedUser.socialPicture} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Home;
