// import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
// import { Routes,Route } from "react-router-dom";
// import User from "../user/User";
// import Order from "../order/Order";
// import Product from "../product/Product";
// import Settings from "../settings/Settings"
// import Payments from "../payementlist/Payments";
// import Customer from "../customer/Customer";
import { useNavigate } from "react-router-dom"; 
import OrderChart from "../../components/OrderChart/OrderChart";
import Widget from "../../components/Widget/Widget";
import  PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
export default function Home() {
  //ajouter dans app
  const accessTokenUser = localStorage.getItem('access');
  const Navigate = useNavigate();
  if (!accessTokenUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
 <div className="widgets">
 <Widget type="customer"/>
        <Widget type="order"/>
        <Widget  type="earning"/>
         <Widget type="category"/> 
 </div>
 <div className="charts">
        
          <OrderChart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
}

