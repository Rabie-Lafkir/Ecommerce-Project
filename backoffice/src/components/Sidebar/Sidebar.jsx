import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { RiProfileLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";

import { FiShoppingCart } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../../assets/white-logo.png' 

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/home", icon: MdOutlineDashboard },
    { name: "Users", link: "/users", icon: AiOutlineUser },
    { name: "Customers", link: "/customers", icon: FiUsers },
    { name: "Products", link: "/products", icon: GoPackage },
    { name: "Orders", link: "/orders", icon: FiShoppingCart },
    { name: "Categories", link: "/category", icon: MdOutlineCategory },
    { name: "View Profile", link: "/settings", icon: RiProfileLine },
  ];
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } 
   
  const [open, setOpen] = useState(true);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    role: "",
  });

  useEffect(() => {
    const extractUserInfoFromToken = () => {
      const token = localStorage.getItem("access_token");
      //console.log("Token from localStorage:", token);

      try {
        const decodedToken = jwtDecode(token);

        setUserInfo({
          first_name: decodedToken.user.first_name,
          last_name: decodedToken.user.last_name,
          role: decodedToken.user.role,
        });
      } catch (error) {
        console.error("You have an error:", error);
      }
    };

    extractUserInfoFromToken();
  }, []);
    //console.log(userInfo)
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0a5693] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex justify-center items-center mb-4">
          <img
            src={logo}
            alt="Logo"
       className=""
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {/* <Avatar
            sx={{
              mx: "auto",
              width: open ? 88 : 30,
              height: open ? 88 : 30,
              my: 1,
              transition: "0.25s",
            }}
            alt="Rabie"
            src={profile}
            
          /> */}
          <div className="w-full flex justify-center align-center">
          <Avatar {...stringAvatar(`${userInfo.first_name} ${userInfo.last_name}`)} />
          </div>
          <Typography
            align="center"
            sx={{
              fontSize: open ? 22 : 0,
              fontWeight: "bold",
              transition: "0.25s",
              marginTop: 4,
            }}
          >
            {userInfo.first_name} {userInfo.last_name}
          </Typography>{" "}
          <Typography
            align="center"
            sx={{
              fontSize: open ? 17 : 0,
              fontWeight: "bold",
              transition: "0.25s",
              color: "#fff",
            }}
          >
            {userInfo.role}
          </Typography>
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center  gap-3.5 font-medium p-2 hover:bg-sky-700  rounded-md`}
              style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              {/* <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2> */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
