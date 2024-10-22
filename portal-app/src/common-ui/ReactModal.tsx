import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// Styled components using MUI's `styled`
const ModalOverlay = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ModalContent = styled(Box)({
    position: 'relative',
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
});

const CloseButtonWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const ModalFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
});
interface ReactModal {
    isShow: boolean;
    onClose: () => any;
    onSave?: () => any;
    content: any;
}
const ReactModal = ({ isShow, onClose, onSave, content}: ReactModal) => {
    if (!isShow) return null;

    return createPortal(
        <ModalOverlay>
            <ModalContent>
                <CloseButtonWrapper>
                    <Box sx={{margin: 'auto'}}>
                    <Typography variant='h6' color={'#f3a10b'}>Profile form</Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </CloseButtonWrapper>

                {/* Modal Body */}
                <Box component="form">
                    {content}
                </Box>

                {/* Modal Footer with Save Button */}
                {/* <ModalFooter>
                    <Button variant="contained" color="primary" onClick={onSave}>
                        Save
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
};

export default memo(ReactModal);
