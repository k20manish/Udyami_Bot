import React from 'react'
import AboutUs from './component/AboutUs'
import Contact from './component/Contact'
import Home from './component/Home'
import NavBarNew  from './component/NavBarNew'
import { Route, Routes, Router} from 'react-router-dom'
 


function App() {
  return (
    <>
      <NavBarNew />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App