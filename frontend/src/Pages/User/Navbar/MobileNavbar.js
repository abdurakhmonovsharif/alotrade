import { map, uniqueId } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { mobileNavs } from "./constants";

const MobileNavbar = () => {
  return (
    <ul class="fixed bottom-0 left-0 w-full bg-alotrade z-10 flex items-center justify-between py-2 px-3">
      {map(mobileNavs, (nav) => (
        <Link
          key={uniqueId("navbar")}
          to={nav.path}
          onClick={nav.onClick}
          className="flex flex-col items-center"
        >
          {nav.icon}
          <div className="text-[12px] text-white">{nav.name}</div>
        </Link>
      ))}
    </ul>
  );
};

export default MobileNavbar;
