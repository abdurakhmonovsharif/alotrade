import React from "react";
import { Link } from "react-router-dom";

const TabContent = ({ icon, title, link }) => {
  return (
    <Link
      to={link}
      className="flex flex-col justify-center items-center drop-shadow-xl md:w-[250px] md:h-[150px] w-full h-[100px] bg-alotrade rounded-xl"
    >
      {icon}
      <h2 className="md:text-[21px] text-[12px] font-bold text-white text-center mt-2">
        {title}
      </h2>
    </Link>
  );
};

export default TabContent;
