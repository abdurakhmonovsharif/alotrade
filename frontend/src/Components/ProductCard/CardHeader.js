import React from "react";

const CardHeader = ({ user, createdAt, position, organization, logged }) => {
  const name = organization?.name;
  return (
    <div className="border-t w-full px-3 py-1 font-semibold text-[#01c2cc] mt-2">
      <div className="flex justify-end w-full text-[10px] md:text-[14px]">
        <h3 className="font-amazonbold">{name}</h3>
      </div>
    </div>
  );
};

export default CardHeader;
