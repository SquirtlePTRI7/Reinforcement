import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';

import LeaderboardStatsBlock from '../Components/LeaderboardStatsBlock';

import { LeaderboardRow } from '../../types';
import axios from 'axios';

const LeaderboardContainer = () => {
  const [leaderboardRows, setLeaderboardRows] = React.useState([{key: null, username: null, score: null}]);

  // Invoked on initial page load to fetch all users' data from the database and use it to set state
  const getLeaderboardStats = async () => {
    function createData (key: number, username: string, score: number){
      return { key, username, score }
    }

    await axios
      .get('/users')
      .then(data => {
        setLeaderboardRows(data.data
          .map((profile: {username: string, currentScore: number}, index: number) => {
            return createData(index, profile.username, profile.currentScore)
          })
          .sort((a: LeaderboardRow, b: LeaderboardRow) => b.score - a.score));
        })
      .catch()

  }

  useEffect(() => {
    getLeaderboardStats();
  }, [])

  return (
    <div>
      <Typography variant="h2" component="h2">
        Leaderboard
      </Typography>
      <LeaderboardStatsBlock leaderboardRows={leaderboardRows} />
    </div>
  )
};

export default LeaderboardContainer;