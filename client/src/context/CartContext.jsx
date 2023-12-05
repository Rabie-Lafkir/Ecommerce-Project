import { createContext, useContext, useState } from 'react';

// Create a context for managing the cart state
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart functionality
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (itemId) => {
    console.log("Removing item with ID:", itemId); // Log the ID to check correctness
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    console.log("Updated Cart Items:", updatedCart); // Log updated cart items to check removal
    setCartItems(updatedCart);
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
