import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
//import { RiSettings4Line } from "react-icons/ri";
//import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
//import { MdAttachMoney } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";

import {  FiShoppingCart } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const profile = require('../../assets/profile.jpg')





const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/home", icon: MdOutlineDashboard },
    { name: "Users", link: "/users", icon: AiOutlineUser },
    { name: "Customers", link: "/customers", icon: FiUsers },
    { name: "Products", link: "/products", icon: GoPackage},
    { name: "Orders", link: "/orders", icon: FiShoppingCart },
    { name: "Categories", link: "/category", icon: MdOutlineCategory },
    { name: "Setting", link: "/settings", icon: IoSettingsOutline },
  ];

 
  const [open, setOpen] = useState(true);
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
        <div className="mt-4 flex flex-col gap-4 relative">
          <Avatar
            sx={{
              mx: "auto",
              width: open ? 88 : 30,
              height: open ? 88 : 30,
              my: 1,
              transition: "0.25s",
            }}
            alt="Rabie"
            src={profile}
          />
          <Typography
            align="center"
            sx={{ fontSize: open ? 22 : 0, fontWeight:"bold", transition: "0.25s" }}
          >
            {" "}
            Rabie Lafkir{" "}
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
            {" "}
            Admin{" "}
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

export default  SideBar;