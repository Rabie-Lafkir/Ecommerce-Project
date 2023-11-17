import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { Routes,Route } from "react-router-dom";
import User from "../user/User";
import Order from "../order/Order";
import Product from "../product/Product";
import Settings from "../settings/Settings"
import Payments from "../payementlist/Payments";
import Customer from "../customer/Customer";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
      </div>
    </div>
  );
}

