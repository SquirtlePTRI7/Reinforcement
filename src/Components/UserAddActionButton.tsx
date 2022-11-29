import React from 'react';
import Button from '@mui/material/Button';

const UserAddActionButton = (props: any) => {
  const { handleOpen } = props;

  return (
    <Button onClick={handleOpen}>New Action</Button>
  )
};

export default UserAddActionButton;