import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  Wrapper,
  Title,
  Underline,
  // Container,
  // style,
  SecondTitle,
  Logo,
  Separator,
} from "./Login.element";

const logo = require("../../assets/Logo.png");

const Login = () => {
  
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  

 



  const handleSubmit = async (e) => {
    e.preventDefault();

   
  };

  const content = (
    <>
      <Wrapper>
        {/* <img src={logo} alt=""></img> */}
        <Logo src={logo}></Logo>
        <Separator></Separator>
        <Form onSubmit={handleSubmit}>
          <Title>Welcome</Title>
          <SecondTitle>PLEASE LOGIN TO ADMIN DASHBOARD</SecondTitle>
          <Underline></Underline>
          <Input
            type="text"
            name="username"
            id="username"
          
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </Form>
      </Wrapper>
    </>
  );

  return content;
};

export default Login;
