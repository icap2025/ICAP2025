import React from "react";
import { SignupForm } from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-background-surface flex-grow flex flex-col justify-center hsm:justify-start items-center overflow-auto">
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
