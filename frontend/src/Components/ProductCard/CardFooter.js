import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

const CardFooter = ({ phone, id }) => {
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(!show);
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2 md:gap-8 m-0 pb-4 px-2">
      <button
        onClick={showHandler}
        className="bg-white text-[7px] font-medium md:text-[14px] border-2 border-[#01c2cc] text-[#01c2cc] cursor-pointer px-3 text-center justify-center items-center py-1 rounded-3xl flex space-x-2 flex-row"
      >
        {show ? (
          "+" + phone
        ) : (
          <IoCallOutline className="text-[14px] md:text-[22px]" />
        )}
      </button>
      <Link
        to={`/products/${id}`}
        className="bg-[#01c2cc] text-[10px] md:text-[16px] shadow-sm  shadow-[#01c2cc] text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-3xl flex space-x-2 flex-row"
      >
        Показать
      </Link>
    </div>
  );
};

export default CardFooter;
