import * as React from 'react'
import Auth from '~/pages/Auth/Auth'
import Board from './pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Redirect Routes */}
      <Route path='/' element={
        <Navigate to="/boards/673794d4270b33d675b1c729" replace={true} />
      }
      />

      {/* Board Details */}
      <Route path='/boards/:boardId' element={<Board />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/* 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
