import React from 'react'
import InputField from './component/InputField'
import Header from './component/Header'
import { Route, Routes} from 'react-router-dom'
 


function App() {
  return (
    <div>
      <Header/>
      <InputField/>
      {/* <Routes>
  <Route path="/input" element={<InputHandle />} />
  <Route path="/chat" element={<Chatbot />} />
</Routes> */}
       
    </div>
  )
}

export default App