import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/v1/customers', userData);
      toast.success(response.data.message); 
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); 
      } else {
        toast.error('An error occurred'); 
      }
      console.error('Sign-up failed:', error);
    } finally{
      setFirstName('');
      setEmail('');
      setLastName('');
      setPassword('');
    }
  };




  return (
    <div className="w-[90%]">
      <p className="text-gray-500 text-center font-normal">
        Nice to meet you! Enter your details to register.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="mb-1 flex flex-col lg:flex-row justify-center gap-5">
          <input
            className="w-full lg:w-1/2 rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
            placeholder="Last Name"
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          <input
            className="w-full lg:w-1/2 rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
            placeholder="First Name"
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <input
          className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
          placeholder="********"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 px-4 hover:bg-primary-dark"
          >
            Sign Up
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}
