import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import './Discover.css'

const DiscoverMore = () => {
  return (
    <div className='flex flex-col lg:flex-row mx-10 gap-4'>
      <div className='lg:w-1/2 bg-img-1 h-96 rounded-3xl flex'>
        <div className="flex flex-col gap-4 m-14 w-2/3">
          <span className='text-[0.8rem] text-secondary font-bold text-start'>SALE UP TO 10% UP</span>
          <h1 className='text-3xl font-bold text-start text-gray-800'>Smart telecare<br/>Solution</h1>
          <button className='bg-none underline self-start flex items-center justify-center hover:text-secondary'>Discover More <MdKeyboardArrowRight/></button>
        </div>
      </div>
      <div className='lg:w-1/2 bg-img-2 h-96 rounded-3xl flex'>
        <div className="flex flex-col gap-4 m-14 w-2/3">
          <span className='text-[0.8rem] text-secondary font-bold text-start'>SALE UP TO 10% UP</span>
          <h1 className='text-3xl font-bold text-start text-gray-800'>Smart telecare<br/>Solution</h1>
          <button className='bg-none underline self-start flex items-center justify-center hover:text-secondary'>Discover More <MdKeyboardArrowRight/></button>
        </div>
      </div>
    </div>
  );
};


export default DiscoverMore
