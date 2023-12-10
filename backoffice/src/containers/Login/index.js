
import React, { useState } from "react";
import axios from "axios";
import {
 Button,
 Input,
 Form,
 Wrapper,
 Title,
 Underline,
 SecondTitle,
 Logo,
 Separator,
} from "./Login.element";

import { useNavigate } from "react-router-dom"; 

const logo = require("../../assets/Logo.png");

const Login = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
  
 const navigate = useNavigate();

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(username, password);
     
      const response = await axios.post(
        "http://localhost:5000/v1/users/login",
        {
          userName: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
     
      const data = response.data
      console.log(response)
      
      localStorage.setItem("access", data[1].access_token);
      localStorage.setItem("refresh", response.data.refresh_Token);
      console.log('response.data.refresh_Token : ',response.data.refresh_Token)
       
      navigate("/home");
    
    } catch (error) {
      console.error("Login failed:", error);
    }
 };

 return (
    <Wrapper>
      <Logo src={logo} alt="Logo" />
      <Separator />
      <Form onSubmit={handleSubmit}>
        <Title>Welcome</Title>
        <SecondTitle>PLEASE LOGIN TO ADMIN DASHBOARD</SecondTitle>
        <Underline />
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button> 
      </Form>
    </Wrapper>
 );
};

export default Login;

//
//In this code, we have a login form that takes a username and password as input. When the form is submitted, the `handleSubmit` function is called. This function sends a POST request to the server with the provided username and password. If the request is successful, the server returns an access token, which is stored in the local storage. The user is then redirected to the home page.
//
//The `Login` component is a functional component that uses the `useState` hook to manage the state of the username and password. The `useNavigate` hook from `react-router-dom` is used to programmatically navigate to the home page after a successful login.
//
//The `handleSubmit` function is an asynchronous function that sends a POST request to the server with the provided username and password. If the request is successful, the server returns an access token, which is stored in the local storage. The user is then redirected to the home page. If the request fails, an error message is logged to the console.
//
//The `Login` component renders a form with input fields for the username and password. The form also includes a submit button that triggers the `handleSubmit` function when clicked.
//
//The `Wrapper` component is used to style the login form. It includes a logo, a separator, and the form itself.
//
//The `Form` component is used to style the login form. It includes a title, a subtitle, an underline, and the input fields for the username and password.
//
//The `Input` component is used to style the input fields for the username and password. It includes a placeholder and a required attribute to ensure that the user provides a value for these fields.
//
//The `Button