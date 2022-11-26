import React from 'react'
import { Route, Routes } from 'react-router-dom';

import UserContainer from './Containers/UserContainer';
import CohortContainer from './Containers/CohortContainer';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UserContainer />} />
      <Route path='/leaderboard' element={<CohortContainer />} />
    </Routes>
  )
}

export default App;