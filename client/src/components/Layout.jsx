// Layout.js
import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col w-full overflow-x-hidden'>
      <Navbar />
      <ToastContainer/>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
