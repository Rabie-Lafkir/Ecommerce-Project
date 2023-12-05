import React from 'react'
import SideBar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import ProductDatatable from '../../components/ProductDatatable/ProductDatatable';
import './Product.css';
const Product = () => {
  return (
    <div className="product">
      <SideBar />
      <div className="productContainer">
        <Navbar />
        <ProductDatatable/>
      </div>
    </div>
  )
}

export default Product;
