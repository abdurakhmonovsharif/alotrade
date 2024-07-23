import React, { useState } from "react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { map } from "lodash";
import { Link, useLocation } from "react-router-dom";
import PhoneIcon from "../Icons/PhoneIcon";

const CardInfo = ({
  _id,
  categories,
  subcategories,
  tradetypes,
  phone,
  logged,
  translations,
  name,
  region,
  district,
}) => {

  const location = useLocation()

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="mt-4 text-neutral-500 flex flex-col justify-between h-full ">
      <div className="pl-3 mb-2 border-neutral-400 mx-4">
        <h3 className="text-neutral-600 text-lg font-bold font-amazonbold">
          {name}
        </h3>
        <div className="flex items-center text-neutral-500">
          <IoLocationOutline />
          <h3 className="ml-3 text-sm">
            {region?.name}, {district?.name}
          </h3>
        </div>
      </div>

      {location.pathname !== '/' && <div className=" flex w-full border-t mt-3 text-sm">
        <p
          onClick={handleShow}
          className="w-1/2  bg-[#16a34a] text-white flex items-center justify-center py-1 hover:text-success-500"
        >
          {show ? phone : <PhoneIcon size={20} fill="#fff" />}
        </p>
        <Link
          to="/organization"
          state={{ _id }}
          className="w-1/2 bg-orange-500 flex items-center justify-center py-1 hover:text-success-500 text-white"
        >
          {translations.koproq_malumot}
        </Link>
      </div>}
    </div>
  );
};

export default CardInfo;
