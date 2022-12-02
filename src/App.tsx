import React from 'react'
import { Route, Routes } from 'react-router-dom';


import LoginContainer from './Containers/LoginContainer';
import UserContainer from './Containers/UserContainer';
import LeaderboardContainer from './Containers/LeaderboardContainer';

const App = () => {

    return (
      <Routes>
        <Route path='/' element={<LoginContainer />} />
        <Route path='/:id' element={<UserContainer />} />
        <Route path='/leaderboard' element={<LeaderboardContainer />} />
      </Routes>

  )
}

export default App;