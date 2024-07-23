import React, { useState } from "react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { map } from "lodash";
import PhoneIcon from "../Icons/PhoneIcon";

const MainCardInfo = ({
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
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="mt-4 text-neutral-500 flex flex-col justify-between h-full ">
      <div className="pl-3 mb-2 border-neutral-400 mx-4">
        <h3 className="text-neutral-600 text-[12px] text-lg font-bold font-amazonbold">
          {name}
        </h3>
        <div className="flex items-center text-neutral-500">
          <IoLocationOutline className="text-[10px] text-sm" />
          <h3 className="ml-3 text-[10px] md:text-sm">
            {region?.name}, {district?.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MainCardInfo;
