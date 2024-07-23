import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { map, uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../translation";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logOut } from "../../Pages/Sign/signSlice";
import useWindowSize from "../../hooks/useWindowSize";

const ProfileRouteLinks = ({ menu }) => {
  const { width } = useWindowSize();

  const { t } = useTranslation();
  const translations = getTranslations(t);
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const dispatch = useDispatch();

  const linkHandler = (e) => {
    setPath(e);
  };

  return (
    <div className='hidden md:flex overflow-x-scroll md:max-w-[300px] md:w-1/3 w-full py-4 md:py-0 md:flex-col px-2 bg-alotrade '>
      {map(menu, (item) => (
        <Link
          onClick={() => linkHandler(item.path)}
          key={uniqueId("profileRouteLinks")}
          className={` flex shadow-lg min-w-[100px]  ${
            (location.pathname === item.path && "bg-orange-500 text-white") ||
            "bg-white text-alotrade "
          } font-bold text-white my-1 w-full justify-center md:justify-start items-center text-[12px] md:text-base py-3 ${
            item.class && item.class
          }`}
          to={item.path}
        >
          <span className='px-2 hidden md:inline'>{item.icon}</span>
          {item.title}
        </Link>
      ))}
      <button
        onClick={() => dispatch(logOut())}
        className='text-[14px] text-red-400 flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-white mt-20 mb-3'
      >
        <ArrowSmallLeftIcon className='w-[25px]' />
        <span>Выйти</span>
      </button>
    </div>
  );
};

export default ProfileRouteLinks;
