import React from 'react'
import SideBar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CategoryData from '../../components/CategoryDataTable/CategoryData'
import './Category.css';
const Category = () => {
  return (
    <div className="Category">
      <SideBar />
      <div className="CategoryContainer">
        <Navbar />
        <CategoryData/>
      </div>
    </div>
  )
}

export default Category;
