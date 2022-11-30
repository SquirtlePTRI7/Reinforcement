import React from 'react';
import Button from '@mui/material/Button';

const UserAddActionButton = (props: any) => {
  const { handleOpen } = props;

  return (
    <Button onClick={handleOpen} sx={{ marginBottom: 2 }}>New Action</Button>
  )
};

export default UserAddActionButton;