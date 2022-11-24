import React from 'react';

import CohortStatsBlock from '../Components/CohortStatsBlock';

const CohortContainer = () => {
  const [allStats, setAllStats] = React.useState([]);

  const getAllStats = () => {
    // DATABASE REQUEST AND SETALLSTATS
  }

  return (
    <div>
      <CohortStatsBlock allStats={allStats} />
    </div>
  )
};

export default CohortContainer;