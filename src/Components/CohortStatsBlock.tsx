import React from 'react'

import CohortStatsRow from './CohortStatsRow';

const CohortStatsBlock = (props) => {

  const [ allStats ] = props;

  const Rows = allStats.map((user: Array<any>, index: number) => {
    <CohortStatsRow key={index} user={user} />
  })
  return (
    { Rows }
  )
}

export default CohortStatsBlock;