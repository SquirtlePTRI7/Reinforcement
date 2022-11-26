import React from 'react';

import CohortStatsBlock from '../Components/CohortStatsBlock';

const CohortContainer = () => {
  const [cohortRows, setCohortRows] = React.useState([]);

  const getCohortStats = () => {
    // DATABASE REQUEST AND SETALLSTATS

    function createData (key: number, username: string, score: number){
      return { key, username, score }
    }

    setCohortRows(data.map((profile: {username: string, score: number}, index: number) => {
      createData(index, profile.username, profile.score)
    }).sort((a,b) => a.profile.score - b.profile.score))
  
  }

  return (
    <div>
      <CohortStatsBlock allStats={cohortRows} />
    </div>
  )
};

export default CohortContainer;