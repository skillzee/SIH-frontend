import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Header'
import Selection from './components/Selection'
import DonorSignup from './components/DonorSignup'
import RecipientSignup from './components/RecipientSignup'
import About from './components/About'
import Home from './components/Home'


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path={'/selection'} element={<Selection/>}/>
        <Route path="/signup/donor" element={<DonorSignup />} />
        <Route path="/signup/recipient" element={<RecipientSignup />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/home' element = {<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App