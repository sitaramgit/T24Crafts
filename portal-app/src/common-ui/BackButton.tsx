import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // If using react-router
import { Box } from '@mui/material';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <Box sx={{}}>
        <Box sx={{display:'flex', ml:'10%', mt: '3%', cursor: 'pointer'}}  onClick={handleBack} >
        <ArrowBackIcon/> &nbsp; 
        Back
        </Box>
    </Box>
  );
};

export default BackButton;
