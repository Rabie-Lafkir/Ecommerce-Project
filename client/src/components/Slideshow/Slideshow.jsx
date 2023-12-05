import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import backgroundImage1 from "../../assets/slider/sliderBackground.webp";
import backgroundImage2 from "../../assets/slider/sliderBackground2.webp";
import backgroundImage3 from "../../assets/slider/sliderBackground3.webp";

const Slideshow = () => {
  const slides = [
    {
      url: backgroundImage1,
      content: (
        <div className="flex flex-col gap-5 justify-center  lg:relative lg:top-16 lg:left-10">
          <h1 className="font-bold text-5xl">
            24/7 Whole Home <br />
            Protection
          </h1>
          <p className="text-xl">Your home is safer than ever</p>
          <button className="bg-white text-primary rounded-full px-6 py-3 hover:text-white hover:bg-secondary w-40 text-bold flex align-center justify-center self-center">
            Shop now <IoIosArrowForward className="self-center pt-0.5" />
          </button>
        </div>
      ),
      animate: true, 
    },
    {
      url: backgroundImage2,
      content: (
        <div className="flex flex-col gap-5 justify-center  lg:relative lg:top-16 lg:left-10">
          <h1 className="font-bold text-5xl">
            Designers Talk <br />
            Smart Speakers
          </h1>
          <p className="text-xl">Google Home, Apple HomePod</p>
          <button className="bg-white text-primary rounded-full px-6 py-3 hover:text-white hover:bg-secondary w-40 text-bold flex align-center justify-center self-center">
            Shop now <IoIosArrowForward className="self-center pt-0.5" />
          </button>
        </div>
      ),
      animate: true, 
    },
    {
      url: backgroundImage3,
      content: (
        <div className="flex flex-col gap-5 justify-center  lg:relative lg:top-16 lg:left-10">
          <h1 className="font-bold text-5xl">
            Smart Home <br />
            Air Purifer
          </h1>
          <p className="text-xl">Removes 99.97% Tiny Objects</p>
          <button className="bg-white text-primary rounded-full px-6 py-3 hover:text-white hover:bg-secondary w-40 text-bold flex align-center justify-center self-center">
            Shop now <IoIosArrowForward className="self-center pt-0.5" />
          </button>
        </div>
      ),
      animate: true, 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  const [animate, setAnimate] = useState(false);

  const prevSlide = () => {
    setAnimate(true);
    setTimeout(() => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(newIndex);
      setAnimate(false);
    }, 500);
  };

  const nextSlide = () => {
    setAnimate(true);
    setTimeout(() => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
      setAnimate(false);
    }, 500);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  return (
    <div className="max-w-[1280px] h-[720px] w-full m-0 top-0 relative group">
      <div
        style={{ backgroundImage: `url(${currentSlide.url})` }}
        className={`w-full h-full bg-center bg-cover duration-500`}
      >
        <div className="absolute sm:top-40 sm:left-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <p className="text-lg">
            <span className='animate-fade-up animate-once animate-duration-[1000ms]'>
              {currentSlide.content}
            </span>
          </p>
        </div>
      </div>
      <div className="hidden group-hover:block hover:bg-transparent hover:text-white absolute top-[50%] -translate-x-0 left-5 text-2xl rounded-full p-2 bg-black/20 text-primary bg-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block hover:bg-transparent hover:text-white absolute top-[50%] -translate-x-0 right-5 text-2xl rounded-full p-2 bg-black/20 ttext-primary bg-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
