import React from 'react'

import UserAddActionModal from '../Components/UserAddActionModal';
import UserAddActionButton from '../Components/UserAddActionButton';

const UserContainer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {

  };

  return (
    <div>UserStatsContainer
      <UserAddActionModal open={open} handleClose={handleClose} handleSave={handleSave} />
      <UserAddActionButton handleOpen={handleOpen} />
    </div>

  )
}

export default UserContainer