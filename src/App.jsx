import React from 'react'
import AboutUs from './component/AboutUs'
import Contact from './component/Contact'
import Home from './component/Home'
import NavBarNew  from './component/NavBarNew'
import LoginPage from './component/LoginPage'
import { Route, Routes, Router,useLocation} from 'react-router-dom'
import Registration_Page from './component/Registration_Page'
 


function App() {

  const location = useLocation();

  // Define the paths where navbar should be hidden
  const hideNavPaths = ["/LoginPage", "/Registration_Page"];

  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <>
    {!shouldHideNav && <NavBarNew />}
      <div className={!shouldHideNav ? 'pt-0' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration_Page" element={<Registration_Page />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App