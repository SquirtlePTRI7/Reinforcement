import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import UserAddActionModal from '../Components/UserAddActionModal';
import UserAddActionButton from '../Components/UserAddActionButton';
import UserStatsBlock from '../Components/UserStatsBlock';

const UserContainer = () => {
  const [userStats, setUserStats] = React.useState({
    username: null,
    currentScore: null,
    actions: [],
  });
  const { id } = useParams();

  // Invoked on initial page load to fetch user data from the database and use it to set state
  const getUserStats = async (): Promise<void> => {
    await axios
      .get(`users/${id}`)
      .then((data) => {
        function createData(key: number, label: string, value: number) {
          return { key, label, value };
        }

        const stats = {
          username: data.data.username,
          currentScore: data.data.currentScore,
          actions: [
            createData(0, 'Applications', data.data.applicationSubmissions),
            createData(1, 'Phone Screens', data.data.phoneScreens),
            createData(2, 'Interviews', data.data.interviews),
            createData(3, 'Job Offers', data.data.jobOffers),
          ],
        };

        setUserStats(stats);
      })
      .catch((err: Error) => err);
  };

  useEffect(() => {
    getUserStats();
  }, []);

  // State/functionality for managing the action Radio button selection and error text in AddActionModal
  const [actionType, setActionType] = React.useState(null);
  const [actionErr, setActionErr] = React.useState(false);
  const [actionErrHelp, setActionErrHelp] = React.useState('');
  const resetActionErr = () => {
    setActionErr(false);
    setActionErrHelp('');
  };
  const handleActionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActionType((event.target as HTMLInputElement).value);
    resetActionErr();
  };

  // State/functionality for managing AddActionModal open/close
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setActionType(null);
    resetActionErr();
  };

  // Invoked in UserAddActionModal when save button is clicked. Sends patch request to db and updates state for rerender
  const handleSave = async (): Promise<void> => {
    const action: 'applicationSubmissions' | 'phoneScreens' | 'interviews' | 'jobOffers' = actionType;
    const actionValues = {
      applicationSubmissions: 1,
      phoneScreens: 5,
      interviews: 10,
      jobOffers: 20,
    };
    const body = {
      username: id,
      action,
      value: actionValues[action],
    };

    if (action) {
      await axios
        .patch('users/add-action', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          setUserStats({
            username: userStats.username,
            currentScore: userStats.currentScore + actionValues[action],
            actions: [
              {
                key: 0,
                label: 'Applications',
                value:
                  userStats.actions[0].value + (action === 'applicationSubmissions' ? 1 : 0),
              },
              {
                key: 1,
                label: 'Phone Screens',
                value:
                  userStats.actions[1].value + (action === 'phoneScreens' ? 1 : 0),
              },
              {
                key: 2,
                label: 'Interviews',
                value:
                  userStats.actions[2].value + (action === 'interviews' ? 1 : 0),
              },
              {
                key: 3,
                label: 'Job Offers',
                value:
                  userStats.actions[3].value + (action === 'jobOffers' ? 1 : 0),
              },
            ],
          });
          handleClose();
        })
        .catch((err: Error) => console.log(err));
    } else {
      setActionErr(true);
      setActionErrHelp('Please select an action type');
    }
  };

  return (
    <div>
      <Typography variant="h2" component="h2">
        {userStats.username}
      </Typography>
      <UserAddActionModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        actionErr={actionErr}
        actionErrHelp={actionErrHelp}
        handleActionSelect={handleActionSelect}
      />
      <UserAddActionButton handleOpen={handleOpen} />
      <UserStatsBlock userStats={userStats} />
    </div>
  );
};

export default UserContainer;
