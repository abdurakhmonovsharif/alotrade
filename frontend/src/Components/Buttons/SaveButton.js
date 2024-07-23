import React from "react";

const SaveButton = ({ onClick, title, className, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`bg-alotrade text-white mt-4 rounded-md py-2 px-4 ${className}`}
    >
      {title}
    </button>
  );
};

export default SaveButton;
