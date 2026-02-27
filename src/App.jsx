import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage'
import AdminPage from './pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TestingPage from './pages/testingPage'
import { Toaster } from 'react-hot-toast'


function App() {
 
  return (
    <BrowserRouter>
    <Toaster position='top-right'/>
  <Routes path='/*'>
  <Route path='/admin/*' element={<AdminPage />} />
  <Route path='/login' element={<LoginPage />} />
  <Route path='/' element={<h1>Home Page</h1>} />
  <Route path='/testing' element={<TestingPage />} />
  <Route path='/*' element={<h1>404 Not Found</h1>} />
  
  </Routes>
   
    </BrowserRouter>


   
  )
}

export default App
