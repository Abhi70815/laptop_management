import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import AddEmployee from './components/Employee/AddEmployee'
import AddLaptop from './components/laptop/AddLaptop'
import AssignLaptop from './components/laptop/AssignLaptop'
import CreateIssue from './components/issue/CreateIssue'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeePortal from './pages/EmployeePortal'
import RequestList from './components/request/RequestList'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/navbar/Navbar'
import './App.css'

const App = () => {
  return (
   <AuthProvider>
        <Navbar/>
       
       <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-laptop" element={<AddLaptop />} />
        <Route path="/assign-laptop" element={<AssignLaptop />} />
        <Route path="/create-issue" element={<CreateIssue />} />
        <Route path="/employee" element={<EmployeePortal />} />
        <Route path="/requests" element={<RequestList />} />
       </Routes>

   </AuthProvider>

  
  )
}

export default App