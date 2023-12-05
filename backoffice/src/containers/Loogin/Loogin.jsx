import React from "react";
import axios from "axios";
import logo from "../../assets/Logo.png";
import './Loogin.css';
export default function Loogin() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   const {username, password} =e.target;
   const response = await 
    axios
      .post("http://localhost:5000/v1/users/login",{
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : username.value,
          password : password.value,
        }),
      });
     const data = await response.json();
     localStorage.setItem("token",data.token);
     window.location.reload();
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <img src={logo}  alt="logo"/>
        </div>
        <div className="right">
          <form action="" className="form_container" onSubmit={handleSubmit}>
            <h1>WELCOME </h1>
            <h2>PLEASE LOGIN TO ADMIN DASHBOARD</h2>
            
            <input
              type="text"
              name="username"
             
              className="input"
            />
            <input
              type="password"
              name="passowrd"
            
              className="input"
            />

            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
