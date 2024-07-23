import React from "react";
import { Link } from "react-router-dom";

const Button = ({ title, link }) => {
  return (
    <div className="w-full my-2">
      <Link
        to={link}
        className="bg-blue-500 hover:bg-blue-600 block  w-full text-white-900 py-1 font-semibold rounded text-center"
      >
        {title}
      </Link>
    </div>
  );
};

export default Button;
