import { Swiper, SwiperSlide } from "swiper/react";
import { BsCart } from "react-icons/bs";
import { TbShoppingBagPlus } from "react-icons/tb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import productImage1 from "../../assets/productImages/product1.webp";
import productImage2 from "../../assets/productImages/product2.webp";
import productImage3 from "../../assets/productImages/product3.jpg";
import productImage4 from "../../assets/productImages/product4.webp";



const FeaturedProduct = () => {
  const ServiceData = [
    {
      name: "Smart lock for organizations",
      price: "$100",
      backgroundImage: productImage1,
    },
    {
        name: "House sound system",
        price: "$100",
        backgroundImage: productImage3,
      },
      {
        name: "Next Gen Auditive system",
        price: "$100",
        backgroundImage: productImage4,
      },
      {
        name: "Smart Lamp",
        price: "$100",
        backgroundImage: productImage2,
      },
    
  ];
  return (
    <div className="flex items-center justify-center flex-col h-[700px] my-10">
      <h1 className="mb-20 text-3xl lg:text-4xl font-bold text-primary">Featured Products</h1>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[70%] sm:max-w-[90%] "
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <Card className="w-50 mb-10 mt-5 p-5 shadow-sm bg-['#fcfcfc']">
              <CardHeader shadow={false} floated={true} className="h-60">
                <img
                  src={item.backgroundImage}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className="py-5">
                <div className="mb-2 flex items-start">
                  <Typography color="blue-gray" className="font-medium">
                    {item.name}
                  </Typography>
  
                </div>
              </CardBody>
              <CardFooter className="pt-0 flex justify-between">
                <div color="dark blue" className="font-medium text-secondary">
                    {item.price}
                  </div>
                <button
                  className=" bg-stone-100 hover:bg-secondary hover:text-white text-2xl text-stone-800 flex items-center justify-center rounded-full px-3 py-3"
                ><TbShoppingBagPlus/>
                </button>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProduct;
