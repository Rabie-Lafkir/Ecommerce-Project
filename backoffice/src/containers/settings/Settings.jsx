import React from 'react'
import SideBar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './Setting.css';
const Setting = () => {
  return (
    <div className="setting">
      <SideBar />
      <div className="settingContainer">
        <Navbar />
     
      </div>
    </div>
  )
}

export default Setting;
