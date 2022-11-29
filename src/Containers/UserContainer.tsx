import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import UserAddActionModal from '../Components/UserAddActionModal';
import UserAddActionButton from '../Components/UserAddActionButton';
import UserStatsBlock from '../Components/UserStatsBlock';

interface ActionInputElement extends HTMLInputElement {
  value: 'application' | 'phone' | 'interview' | 'offer';
}

const UserContainer = () => {
  const [userStats, setUserStats] = React.useState([]);
  const { id } = useParams();

  const getUserStats = async (): Promise<void> => {
    // DATABASE REQUEST AND SETUSERSTATS
    await axios
      .get(`users/${id}`)
      .then((data) => {

        function createData(key: number, label: string, value: number) {
          return { key, label, value };
        }

        const stats = [
          createData(0, 'Applications', data.data.applicationSubmissions),
          createData(1, 'Phone Screens', data.data.phoneScreens),
          createData(2, 'Interviews', data.data.interviews),
          createData(3, 'Job Offers', data.data.jobOffers),
          createData(4, 'Current Score', data.data.currentScore),
        ]

        setUserStats(stats);
      })
      .catch((err: Error) => err);

    };
    
  // Get current user's stats on initial page load
  useEffect(() => {
      getUserStats();
  }, []);

  // State for managing the action Radio button error text in AddActionModal
  const [actionErr, setActionErr] = React.useState(false);
  const [actionErrHelp, setActionErrHelp] = React.useState('');
  const resetActionErr = () => {
    setActionErr(false);
    setActionErrHelp('');
  };

  // State for managing AddActionModal open/close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetActionErr();
  };

  const handleSave = async (): Promise<void> => {
    const action: 'application' | 'phone' | 'interview' | 'offer' = (
      document.getElementById('action-selection') as ActionInputElement
    ).value;
    const actionValues = {
      application: 1,
      phone: 5,
      interview: 10,
      offer: 20,
    };
    const body = {
      action,
      value: actionValues[action],
    };

    if (action) {
      await axios
        .post('user/add-action', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          handleClose();
          // UPDATE USERSTATS
        })
        .catch((err: Error) => console.log(err));
    } else {
      setActionErr(true);
      setActionErrHelp('Please select an action type');
    }
  };

  return (
    <div>
      <UserAddActionModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        actionErr={actionErr}
        actionErrHelp={actionErrHelp}
        resetActionErr={resetActionErr}
      />
      <UserAddActionButton handleOpen={handleOpen} />
      <UserStatsBlock userStats={userStats} />
    </div>
  );
};

export default UserContainer;
