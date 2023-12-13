/*import './OrderChart.css'
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];
  
function OrderChart({ aspect, title }){
    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0a5693" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0a5693" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#0a5693"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default OrderChart;*/
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import {
      BarChart,
      Bar,
      CartesianGrid,
      XAxis,
      YAxis,
  } from "recharts";
  import './OrderChart.css';
  
  function OrderChart() {

      const [data, setData] = useState([]);
  
      useEffect(() => {
      
          axios.get("http://localhost:5000/v1/products/prodcat")
              .then(response => {
                
                  setData(response.data);
              })
              .catch(error => {
                  console.error("Error:", error);
              });
      }, []); 
      return (
        <div className="chart"> 
        <h2 className="titleProdCat">NUMBER OF PRODUCTS PER CATEGORY</h2>
          <BarChart width={600} height={400} data={data} >
              <Bar dataKey="productCount" fill="rgba(128, 0, 128, 0.2)" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="category_name" interval={0}  tick={{ fontSize: 10 }} />

              <YAxis tick={{ interval: 2 ,fontSize: 15 }} />
          </BarChart>
          </div>
      );
  }
  
  export default OrderChart;
  