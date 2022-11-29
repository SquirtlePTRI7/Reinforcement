import React from 'react'
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { Login } from './Login'

export const App = () : JSX.Element => {
  return (
    <Routes>
      {/* <Route path="*" element={<ErrorPage />} /> */}
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
