import React from 'react'
import OrdersDataTable from '../../components/OrdersDataTable/OrdersDataTable'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const Order = () => {
  return (
    <div>
       <div className="user">
      <Sidebar/>
      <div className="usersContainer">
        <Navbar/>
        <OrdersDataTable/>
      </div>
    </div>
    </div>
  )
}

export default Order
