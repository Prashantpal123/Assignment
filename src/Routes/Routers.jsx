import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Quize from '../pages/Quize'
import Result from '../pages/Result'
import Summary from '../pages/Summary'

const Routers = () => {
  return (  
    <Router>
     <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/home' element={<Home/>} />
     <Route path='/quize' element={<Quize/>} />
     <Route path='/result' element={<Result/>} />
     <Route path='/summary' element={<Summary/>} />
 
  </Routes>
  </Router>
  )
}

export default Routers
