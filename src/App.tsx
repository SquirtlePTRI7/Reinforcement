import React from 'react'
import { Route, Routes } from 'react-router-dom';

import LoginContainer from './Containers/LoginContainer';
import UserContainer from './Containers/UserContainer';
import CohortContainer from './Containers/CohortContainer';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginContainer />} />
      <Route path='/:id' element={<UserContainer />} />
      <Route path='/leaderboard' element={<CohortContainer />} />
    </Routes>
  )
}

export default App;