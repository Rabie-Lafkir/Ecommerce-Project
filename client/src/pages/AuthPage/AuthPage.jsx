import React, { useState } from "react";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";
import { Button } from "@material-tailwind/react";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(true); // State to manage which component to display

  const switchToSignIn = () => {
    setShowSignIn(true);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
  };

  return (
    <div className="w-full flex items-center justify-center my-20">
      <div className="flex flex-col items-center justify-center lg:w-[50%]">
        <div className="w-full flex justify-center mb-1">
          <Button
            onClick={switchToSignIn}
            className={`px-6 py-3 ${
              showSignIn ? 'bg-primary text-white' : 'bg-transparent text-primary' // Change style based on active state
            } w-[45%]  focus:outline-none rounded-none rounded-tl-xl`}
          >
            Sign In
          </Button>
          <Button
            onClick={switchToSignUp}
            className={`px-6 py-3 ${
              !showSignIn ? 'bg-primary text-white' : 'bg-transparent text-primary' // Change style based on active state
            } w-[45%] focus:outline-none rounded-none rounded-tr-xl`}
          >
            Sign Up
          </Button>
        </div>
        {showSignIn ? <SignIn /> : <SignUp />}{" "}
      </div>
    </div>
  );
};

export default AuthPage;
