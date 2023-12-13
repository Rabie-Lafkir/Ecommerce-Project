import { Swiper, SwiperSlide } from "swiper/react";
import {
    RxCrop,
    RxDesktop,
    RxPencil2,
    RxReader,
    RxRocket,
    RxAccessibility,
  } from "react-icons/rx"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";;
import audiovisual from '../../assets/categories/audiovisual.jpg';
import  smartappliances from '../../assets/categories/smartappliances_1.jpg';
import smartlighting from '../../assets/categories/smartlighting.jpg';
import videodoorbell from '../../assets/categories/videodoorbell_1.jpg';
const ShopByCategory = () => {
    const ServiceData = [
        {
          icon: RxCrop,
          title: "Audio Visual",
         // content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
          backgroundImage: audiovisual,
        },
        {
          icon: RxReader,
          title: "Smart Lighting",
         // content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: smartlighting,
        },
        {
          icon: RxAccessibility,
          title: "Video Doorbell",
          //content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: videodoorbell,
        },
        {
          icon: RxPencil2,
          title: "Smart Appliances",
         // content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: smartappliances,
        },
        
      
      ];
  return (
    <div className="flex items-center justify-center flex-col h-[700px] my-10">
        <h1 className="mb-20 text-2xl lg:text-4xl font-bold text-primary">Shop By Category</h1>
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
            <div className="flex flex-col gap-6 mb-20 relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              {/* <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              /> */}
                <img
                src={item.backgroundImage}
                alt={item.title}
                className=" w-full h-full"
                // className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                <p className="lg:text-[18px]">{item.content} </p> */}
                  <h1 className="text-xl  text-primary lg:text-2xl">{item.title} </h1>
              </div>
              {/* <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopByCategory;