import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const CardLogo = ({ logo, name, district, region }) => {
  return (
    <div className="flex justify-center p-4 pb-2">
      {logo ? (
        <img
          src={logo}
          alt={name[0]}
          className="w-[130px] h-[130px] rounded-full bg-neutral-200"
        />
      ) : (
        <h3 className="w-[130px] h-[130px] rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 text-lg">
          alo
        </h3>
      )}
    </div>
  );
};

export default CardLogo;
