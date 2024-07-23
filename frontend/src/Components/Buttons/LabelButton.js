import React from "react";
import { Link } from "react-router-dom";

const LabelButton = ({ link, title, label }) => {
  return (
    <div className="w-full my-2 text-sm text-center text-neutral-500 lowercase">
      {label}
      <Link to={link} className="font-bold text-blue-500 underline">
        {title}
      </Link>
    </div>
  );
};

export default LabelButton;
