import React from 'react';

import LeaderboardStatsBlock from '../Components/LeaderboardStatsBlock';

import { LeaderboardRow } from '../../types';

const LeaderboardContainer = () => {
  const [leaderboardRows, setLeaderboardRows] = React.useState([]);

  const getLeaderboardStats = () => {
    // DATABASE REQUEST AND SETALLSTATS

    function createData (key: number, username: string, score: number){
      return { key, username, score }
    }

    // setLeaderboardRows(data
    //   .map((profile: {username: string, score: number}, index: number) => {
    //     createData(index, profile.username, profile.score)
    //   })
    //   .sort((a: LeaderboardRow, b: LeaderboardRow) => a.score - b.score))
  
  }

  return (
    <div>
      <LeaderboardStatsBlock allStats={leaderboardRows} />
    </div>
  )
};

export default LeaderboardContainer;