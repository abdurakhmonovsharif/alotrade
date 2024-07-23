import React from "react";

const Button = ({ title, onClick, isDisabled }) => {
  return (
    <div className="w-full my-2">
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="bg-alotrade block  w-full text-white py-1 font-semibold rounded"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
