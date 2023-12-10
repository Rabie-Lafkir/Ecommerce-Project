import './Widget.css';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import React , {useEffect, useState} from 'react';
import axios from 'axios';
function Widget ({ type }){
  let data;

  const [amount, setAmount] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;
        switch (type){
          case "customer":
            apiUrl = 'http://localhost:5000/v1/customers/totalcustomers';
            break;
            case "order":
              apiUrl = 'http://localhost:5000/v1/orders/totalorders'; 
              break;
              case "earning":
                apiUrl = 'http://localhost:5000/v1/revenue';
                break;
            case "category":
              apiUrl = 'http://localhost:5000/v1/categories/totalcategories'; 
              break;
            default:
              break;

        }
        if (apiUrl) {
           const response = await axios.get(apiUrl);
           const total = response.data;
           console.log(total)
          setAmount(total);
        }
      } catch (error) {
        console.error(`Error fetching total ${type}:`, error);
      }
    };

    fetchData();
  }, [type]);

  switch (type) {
    case "customer":
      data = {
        title: "CUSTOMERS",
        isMoney: false,
        link: (
          <Link to="/customers" style={{ textDecoration: 'none' }}>
            See all customers
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        
        link: (
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            See all orders
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
       
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "category":
      data = {
        title: "CATEGORIES",
        isMoney: false,
        link: (
          <Link to="/category" style={{ textDecoration: 'none' }}>
            See all categories
          </Link>
        ),
        icon: (
          <CategoryIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
  {data.isMoney && "$"} {amount && typeof amount === 'object' ? amount.data.totalRevenue : amount}
</span>

       
        <span className="linkdash">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;