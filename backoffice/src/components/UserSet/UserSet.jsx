import React, { useState, useEffect } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function UserSet() {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        role: "",
        active: "",
      });
      useEffect(() => {
        const fetchUserData = () => {
          const token = localStorage.getItem("access_token"); 
                  if (token) {
            const decodedToken = jwtDecode(token);
    
          
            setUserData({
              first_name: decodedToken.user.first_name,
              last_name: decodedToken.user.last_name,
              user_name: decodedToken.user.user_name,
              email: decodedToken.user.email,
              password: decodedToken.user.password,
              role: decodedToken.user.role,
              active: decodedToken.user.active,
           
            });
          }
        };
    
        fetchUserData();
      }, []);
    
      const handleInput = (e) => {
        setUserData({
          ...userData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit = async () => {
        try {
          const token = localStorage.getItem("access_token"); 
    
          const response = await axios.put(
            "http://localhost:5000/v1/users",
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log(response.data);
        } catch (error) {
          console.error("Error updating user:", error);
        }
      };
    
  return (
    <div className="transition-colors duration-300">
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center">
  Personal Information
</h1>

          {/* <p className="text-gray-600 dark:text-gray-300 mb-6">
       Here you can find your informations
          </p> */}
          <form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  className="border p-2 rounded w-full"
                  value={userData.first_name}
          onChange={handleInput}
          readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className="border p-2 rounded w-full"
                  value={userData.last_name}
          onChange={handleInput}
          readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="border p-2 rounded w-full"
                  value={userData.user_name}
                  onChange={handleInput}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="border p-2 rounded w-full"
                value={userData.email}
                onChange={handleInput}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 blur-3"
              >
                Password
              </label>
              <input
              type="password" 
              id="password"
              placeholder="Password"
              className="border p-2 rounded w-full " 
              value={userData.password}
              onChange={handleInput}
              readOnly
              />
            </div>
            <div className="mb-4">
              {/* <div> */}
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  placeholder="Role"
                  value={userData.role}
                  onChange={handleInput}
                  className="border p-2 rounded w-full"
                  readOnly
                />
              {/* </div> */}
              {/* <div>
                <label
                  htmlFor="active"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Active
                </label>
                <input
                  type="text"
                  id="active"
                  placeholder="Active"
                  className="border p-2 rounded w-full"
                  value={userData.active}
                  onChange={handleInput}
                  readOnly
                />
              </div> */}
            </div>
            {/* <button
              type="button"
              id="theme-toggle"
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Toggle Theme
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
