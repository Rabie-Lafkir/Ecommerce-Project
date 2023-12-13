import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  let cartQuantity = 0;

  const addToCart = (product, amount) => {
    const existingProductIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += amount; // Update quantity by 'amount'
      setCartItems(updatedCart);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: amount }]);
    } 
      cartQuantity += amount; 

  };

  const removeFromCart = (itemId) => {
    const removedItem = cartItems.find((item) => item._id === itemId);

    if (removedItem) {
      cartQuantity -= removedItem.quantity;
    }

    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const calculateSubtotal = () => {
    let total = 0;

    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    setSubtotal(total);
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, cartQuantity, subtotal, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
