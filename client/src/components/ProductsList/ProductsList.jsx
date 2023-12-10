import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { useCart } from '../../context/CartContext';
import { useProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const { selectProduct } = useProductContext();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/v1/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    selectProduct(product);
    // Redirigez vers la page de détails du produit si nécessaire
  };

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 justify-center px-5 lg:px-44 '>
      {products.map((product) => (
        <Link to={`/products/${product._id}`} key={product._id} onClick={() => handleProductClick(product)}>
          <Card className="mb-1 mt-5 shadow-sm bg-['#fcfcfc'] w-full sm:w-auto">
            <CardHeader shadow={false} floated={true} className='h-60 sm:h-auto'>
              <img
                src={product.product_image}
                alt='card-image'
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardBody className='py-5'>
              <div className='mb-2 flex items-start'>
                <Typography color='blue-gray' className='font-medium'>
                  {product.product_name}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className='pt-0 flex justify-between'>
              <div color='dark blue' className='font-medium text-secondary'>
                {product.price}
              </div>
              <button className='bg-stone-100 hover:bg-secondary hover:text-white text-2xl text-stone-800 flex items-center justify-center rounded-full px-3 py-3' onClick={() => addToCart(product)}>
                <TbShoppingBagPlus />
              </button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
