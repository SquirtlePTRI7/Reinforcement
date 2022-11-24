import React from 'react'

import UserAddActionModal from '../Components/UserAddActionModal';
import UserAddActionButton from '../Components/UserAddActionButton';
import UserStatsBlock from '../Components/UserStatsBlock';

const UserContainer = () => {
  const [userStats, setUserStats] = React.useState({});

  const getUserStats = () => {
    // DATABASE REQUEST AND SETUSERSTATS
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    // ADD ACTION MODAL SAVE LOGIC
  };

  return (
    <div>
      <UserAddActionModal open={open} handleClose={handleClose} handleSave={handleSave} />
      <UserAddActionButton handleOpen={handleOpen} />
      <UserStatsBlock userStats={userStats} />
    </div>

  )
}

export default UserContainer