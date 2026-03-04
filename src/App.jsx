import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage'
import AdminPage from './pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TestingPage from './pages/testingPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/client/registerPage'
import HomePage from './pages/client/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  return (
    <GoogleOAuthProvider clientId='423963416139-qiegb2q25kmjf36mo4h871uhf0d3s5n6.apps.googleusercontent.com'>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes path='/*'>
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path='/testing' element={<TestingPage />} />
          <Route path='/register' element={<RegisterPage />} />


        </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>



  )
}

export default App
