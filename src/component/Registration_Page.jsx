import React from 'react'
import SideBar  from './SideBar'
import Registration_Navbar from './Registration_Navbar'
import HeaderSection from './HeaderSection'
import Registration_List from './Registration_List'

function Registration_Page() {
  return (
    <div className='bg-white h-full flex '>
      <div className=''><SideBar/></div>
       
        <div className='flex flex-col w-full'>
           <div><HeaderSection/></div>
        <div><Registration_Navbar/></div>
        <div><Registration_List/></div>
        </div>
    </div>
  )
}

export default Registration_Page