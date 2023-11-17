import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Helpers/GlobalStyle';
import Login from './containers/Login/index';
import User from './containers/user/User';
import Order from './containers/order/Order';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
;
