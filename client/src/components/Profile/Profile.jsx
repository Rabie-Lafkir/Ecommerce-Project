import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    Active: "",
    role: "",
    active: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/v1/customers/${id}`, customerData)
      .then((response) => {
        console.log("Customer updated:", response.data);
        Swal.fire({
          title: "Good job!",
          text: "Your profile has been updated successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="tracking-tight text-2xl font-semibold">
          Update your information
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill in the form with your details.
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:mx-10 justify-center gap-10">
            <div className=" flex flex-col items-start space-y-2">
              <label
                htmlFor="first-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                First name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium value:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="first-name"
                name="first_name"
                required={true}
                value={customerData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col items-start space-y-2">
              <label
                htmlFor="last-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium value:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="last-name"
                name="last_name"
                required={true}
                value={customerData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col items-start space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium value:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                name="email"
                required={true}
                value={customerData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="items-center flex justify-start gap-5 my-10">
        <button
            className="inline-flex  text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={handleUpdate}
          >
            Update
          </button> 
          <Link className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          to='/'>
            Cancel
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
