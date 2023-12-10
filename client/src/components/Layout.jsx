// Layout.js
import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='w-full'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
