import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Checkout from "./components/Checkout/Checkout";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import Profile from "./components/Profile/Profile";
import Contact from './components/Contact/Contact';


const App = () => {
  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/login" element={<AuthPage/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<CatalogPage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          </Routes>
      </Layout>
    </div>
  );
};

export default App;

