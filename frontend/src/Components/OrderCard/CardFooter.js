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
    <div className="w-full border-t grid grid-cols-2 m-0">
      <button
        onClick={showHandler}
        className="w-full flex justify-center border-r py-1 text-neutral-500"
      >
        {show ? phone : <IoCallOutline size={25} />}
      </button>
      <Link
        to="/offers"
        state={{ type: "order", id }}
        className=" w-full flex justify-center py-1"
      >
        <MdOutlineMessage size={25} className="text-neutral-500" />
      </Link>
    </div>
  );
};

export default CardFooter;
