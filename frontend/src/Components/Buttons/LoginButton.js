import React from "react";
import { Link } from "react-router-dom";

const LoginButton = ({ title }) => {
  return (
    <Link
      to="/sign-in"
      class="
                  text-base
                  font-medium
                  text-white
                  bg-white/20
                  rounded-lg
                  py-3
                  px-6
                  hover:bg-opacity-100 hover:text-dark
                  signUpBtn
                  duration-300
                  ease-in-out
                "
    >
      {title}
    </Link>
  );
};

export default LoginButton;
