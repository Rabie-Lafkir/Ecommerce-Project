import React from 'react'
import SideBar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CustomerDataTable from '../../components/CustomerDataTable/CustomerDataTable';
import './Customer.css';
const Customer = () => {
  return (
    <div className="customer">
      <SideBar />
      <div className="customerContainer">
        <Navbar />
     <CustomerDataTable/>
      </div>
    </div>
  )
}

export default Customer
