import React from "react";
import { Link } from "react-router-dom";

const HeaderMobileOffer = ({ data }) => {
  const organization = data?.organization;
  return (
    <Link
      to={organization ? `/products/${data?._id}` : `/orders/${data?._id}`}
      className="text-white text-[14px] font-medium bg-orange-500 px-2 flex items-center justify-center"
    >
      Подробнее
    </Link>
  );
};

export default HeaderMobileOffer;
