import React, { createContext, useContext, useState } from 'react';


const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({children}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectProduct = (productDetail) => {
    setSelectedProduct(productDetail);
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, selectProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
