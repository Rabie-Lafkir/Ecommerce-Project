import React, { useState } from 'react';
import img from '../../assets/productImages/product1.webp'
import { FaPaypal } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { useCart } from '../../context/CartContext';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';





// Sample products in the cart
const products = [
  { id: 1, name: 'Product 1', price: 20, image: img },
  { id: 2, name: 'Product 2', price: 30, image: img },
  // Add more products as needed
];

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const { cartItems, cartQuantity, subtotal, addToCart, removeFromCart, cartCount } = useCart()

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setErrorMessage] = useState('');

  const customerId = localStorage.getItem("customer")
  console.log(customerId)
  console.log(cartItems)
  const navigate = useNavigate()

  

  
const orderItems = cartItems.map(item => item.product_name);
console.log(orderItems);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/v1/orders', {
        customer_id: customerId,
        cartTotalPrice: subtotal,
        order_items: orderItems,
        address: address,
        payment: paymentMethod,
      });

      if (response.status === 201) {
        toast.success('Your order is added successfully'); 
        navigate('/')

        
      }
    } catch (error) {
      if (error.response) {
        toast.error('An error occurred. Please try again.'); 
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col mx-auto py-8 w-full">
      <ToastContainer/>
      <div className="flex flex-col lg:flex-row w-full justify-center gap-10 ">
        {/* Order Summary */}
        <div className="w-full lg:w-[40%]">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {/* Render products in the cart */}
          {cartItems.map((product) => (
            <div key={product._id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className='flex flex-col justify-start items-start'>
                <p className="ml-4">{product.product_name}</p>
                <p className='ml-4 text-sm '>Quantity: {product.quantity} </p>
                </div>
                
              </div>
              <p>${product.price}</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
        </div>
        {/* Customer Information */}
        <div className="w-full lg:w-[40%] px-6">
          <h2 className="text-xl font-bold mb-4">Customer Information</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              Add your shipping adrdress to complete your order
            </div>
            <div className="mb-4">
              <textarea
              required
                type="text"
                placeholder="Address"
                className="w-full px-3 py-2 border rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {/* Payment Method */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="flex items-center">
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            onChange={() => setPaymentMethod('paypal')}
          />
          <label htmlFor="paypal" className="ml-2 flex align-center">PayPal </label>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            onChange={() => setPaymentMethod('cash')}
          />
          <label htmlFor="cash" className="ml-2">Cash on Delivery</label>
        </div>
      </div>
            <button
              onClick={handleFormSubmit}
              className="bg-primary text-white px-4 py-2 my-4 rounded-md hover:bg-blue-900 w-full"
            >
              Order Now
            </button>
          </form>
          
        </div>
        
      </div>

      
    </div>
  );
};

export default Checkout;
