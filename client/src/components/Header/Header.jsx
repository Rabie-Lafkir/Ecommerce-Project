import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Logo from '../../assets/Logo.png'

const Header = () => {
  return (
    <div className="flex bg-white w-full">
      <div className="logo w-1/12 lg:w-4">
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
