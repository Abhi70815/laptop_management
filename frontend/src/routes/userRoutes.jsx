import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../components/signup/Signup'
import Login from '../components/login/login'
import Home from '../components/home/Home'
// import LaptopManager from '../components/laptopManager/LaptopManager'
import LaptopList from '../components/laptopManager/LaptopList/LaptopList'
import AddLeptop from '../components/laptopManager/Add&EditLaptop/AddLeptop'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/' element ={<Home/>}/>
        <Route path='/laptops' element ={<LaptopList/>}/>
        <Route path='/addlaptop' element ={<AddLeptop/>}/>
       


 

    </Routes>
  )
}

export default UserRoutes