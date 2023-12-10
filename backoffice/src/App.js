import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Helpers/GlobalStyle';
import Login from './containers/Login/index';
import User from './containers/user/User';
import Order from './containers/order/Order';
import Home from './containers/home/Home';
import Customer from './containers/customer/Customer';
import Product from './containers/product/Product';
import Setting from './containers/settings/Settings';
//import Loogin from './containers/Loogin/Loogin';
import Category from './containers/category/Category';
import Register from "./components/page/Auth/Register";
function App() {

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/users" element={<User />} />
          <Route path="/orders" element={<Order />} />
          <Route path='/customers' element={<Customer/>} />
         <Route path='/products' element={<Product/>}/>
         <Route  path='/settings' element={<Setting/>}/>
         <Route  path='/category' element={<Category/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
;
