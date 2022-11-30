import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { CardActionAreaProps } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const UserAddActionModal = (props: any) => {
  const { open, handleClose, handleSave, actionErr, actionErrHelp, handleActionSelect } = props;

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-content'
    >
        <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
                Add a new action
            </Typography>
                <FormControl error={actionErr} id='modal-modal-content' sx={{ mt:2 }}>
                    <FormLabel id='action-types-label'>Select action type</FormLabel>
                    <RadioGroup
                        aria-labelledby='action-types-label'
                        defaultValue=''
                        name='action-types'
                        onChange={handleActionSelect}
                    >
                        <FormControlLabel value='applicationSubmissions' control={<Radio />} label='Application Submitted' />
                        <FormControlLabel value='phoneScreens' control={<Radio />} label='Phone Screen Completed' />
                        <FormControlLabel value='interviews' control={<Radio />} label='Onsite/Video Interview Completed' />
                        <FormControlLabel value='jobOffers' control={<Radio />} label='Job Offer Received' />
                    </RadioGroup>
                    <FormHelperText>{actionErrHelp}</FormHelperText>
                </FormControl>
            <Box sx={{marginTop: 2}}>
                <Button id='save-button' onClick={handleSave} variant='contained' sx={{ marginRight: 2 }}>Save</Button>
                <Button id='cancel-button' onClick={handleClose} variant='outlined'>Cancel</Button>
            </Box>
        </Box>
    </Modal>
  )
};

export default UserAddActionModal;