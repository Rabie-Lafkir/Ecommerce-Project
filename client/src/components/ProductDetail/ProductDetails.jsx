// ProductDetails.js
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useCart } from "../../context/CartContext";

import { useProductContext } from "../../context/ProductContext";

const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const [productDetails, setProductDetails] = useState({ data: [] }); // Définition initiale de productDetails
  const [amount, setAmount] = useState(0);
  const { addToCart,cartQuantity } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (selectedProduct) {
          console.log("Selected Product ID:", selectedProduct._id);
          const response = await axios.get(
            `http://localhost:5000/v1/products/${selectedProduct._id}`
          );
          console.log("Response:", response); // Vérifiez la réponse entière
          if (
            response &&
            response.data &&
            response.data.data &&
            response.data.data.length > 0
          ) {
            console.log("Product Details:", response.data.data[0]);
            setProductDetails({ data: response.data.data }); // Mettez en forme les données dans l'état
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [selectedProduct]);

  
  const increaseAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = productDetails.data.length > 0 && productDetails.data[0];

    addToCart(productToAdd, amount); 
  };



  return (
    <div className="mx-16 my-20">
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center lg:justify-center">
        <div className="flex flex-col gap-6 lg:w-[30%]">
          <img
            src={
              productDetails.data.length > 0 &&
              productDetails.data[0].product_image
            }
            alt=""
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className=" text-secondary font-semibold">
              Special Product
            </span>
            <h1 className="text-3xl font-bold">
              {productDetails.data.length > 0 &&
                productDetails.data[0].product_name}
            </h1>
          </div>

          <p className="text-gray-700">
            {productDetails.data.length > 0 &&
              productDetails.data[0].long_description}
          </p>
          <h6 className="text-2xl font-semibold">
            $ {productDetails.data.length > 0 && productDetails.data[0].price}
          </h6>
          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={decreaseAmount}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={increaseAmount}
              >
                +
              </button>
            </div>
            <button
              className="bg-primary text-white font-semibold py-3 px-16 rounded-xl h-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
