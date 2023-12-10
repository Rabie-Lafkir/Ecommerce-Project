import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../styles/AuthStyles.css";

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin"); // Set default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/v1/register", {
        first_name,
        last_name,
        user_name,
        email,
        password,
        role,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
     
          <div className="col-8">
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              className="form-control"
              placeholder="Enter Your first name"
              required
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              className="form-control"
              placeholder="Enter Your last name"
              required
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              className="form-control"
              placeholder="Enter Your user name"
              required
            />
          
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputState" className="form-label">
            Select your Role
          </label>
          <select
            id="inputState"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
