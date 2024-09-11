import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Header'
import Selection from './components/auth/Selection'
import DonorSignup from './components/auth/Donor/DonorSignup'
import RecipientSignup from './components/auth/Recipient/RecipientSignup'
import About from './components/About'
import Home from './components/Home'
import Services from './components/Services'
import Contact from './components/Contact'
import LoginSelection from './components/auth/LoginSelection'
import DonorLogin from './components/auth/Donor/DonorLogin'
import RecipientLogin from './components/auth/Recipient/RecipientLogin'


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path={'/selection'} element={<Selection/>}/>
        <Route path={'/selection-login'} element={<LoginSelection/>}/>
        <Route path="/signup/donor" element={<DonorSignup />} />
        <Route path="/login/donor" element={<DonorLogin />} />
        <Route path="/signup/recipient" element={<RecipientSignup />} />
        <Route path="/login/recipient" element={<RecipientLogin />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App