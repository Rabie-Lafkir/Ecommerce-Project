// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';
import axios from 'axios';
import { useCart } from '../../context/CartContext';



const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const [productDetails, setProductDetails] = useState({ data: [] }); // Définition initiale de productDetails
  const [amount, setAmount] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (selectedProduct) {
          console.log('Selected Product ID:', selectedProduct._id);
          const response = await axios.get(`http://localhost:5000/v1/products/${selectedProduct._id}`);
          console.log('Response:', response); // Vérifiez la réponse entière
          if (response && response.data && response.data.data && response.data.data.length > 0) {
            console.log('Product Details:', response.data.data[0]);
            setProductDetails({ data: response.data.data }); // Mettez en forme les données dans l'état
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    fetchProductDetails();
  }, [selectedProduct]);
  
  return (
    <div> 
       <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={productDetails.data.length > 0 && productDetails.data[0].product_image} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row justify-between h-24'>
                <img src={productDetails.data.length > 0 && productDetails.data[0].product_image}alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                    <img src={productDetails.data.length > 0 && productDetails.data[0].product_image} alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                    <img src={productDetails.data.length > 0 && productDetails.data[0].product_image}alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                    <img src={productDetails.data.length > 0 && productDetails.data[0].product_image}alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                </div>
                    
                </div>
                <div className='flex flex-col gap-4 lg:w-2/4'>
                <div>
                    <span className=' text-violet-600 font-semibold'>Special Product</span>
                    <h1 className='text-3xl font-bold'>{productDetails.data.length > 0 && productDetails.data[0].product_name}</h1>
                </div>
                
                <p className='text-gray-700'>
                {productDetails.data.length > 0 && productDetails.data[0].short_description}
                </p>
                <h6 className='text-2xl font-semibold'>$ {productDetails.data.length > 0 && productDetails.data[0].price}</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full' onClick={() => addToCart(productDetails.data.length > 0 && productDetails.data[0])}>Add to Cart</button>
                </div>
            </div>

            </div>
     
    </div>
  );
};

export default ProductDetails;
