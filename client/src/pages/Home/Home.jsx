import React from 'react'
import Slideshow from '../../components/Slideshow/Slideshow'
import ShopByCategory from '../../components/ShopByCategory/ShopByCategory'
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct'
import DiscoverMore from '../../components/DiscoverMore/DiscoverMore'

const Home = () => {
  return (
    <>
        <Slideshow/>
        <ShopByCategory/>
        <DiscoverMore/>
        <FeaturedProduct/> 
    </>
  )
}

export default Home
