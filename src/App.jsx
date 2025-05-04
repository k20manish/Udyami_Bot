import React from 'react'
import InputField from './component/InputField'
import NavbarNew from './component/NavBarNew'
import Header from './component/Header'
import Home from './component/Home'
import { Route, Routes} from 'react-router-dom'
 


function App() {
  return (
    <div>
      {/* <Header/> */}
      {/* <NavbarNew/> */}
       <Home/>
      {/* <InputField/> */}
      {/* <Routes>
  <Route path="/input" element={<InputHandle />} />
  <Route path="/chat" element={<Chatbot />} />
</Routes> */}
       
    </div>
  )
}

export default App