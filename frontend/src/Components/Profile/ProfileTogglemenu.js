import React from "react";
import { map, uniqueId } from "lodash";
import ProfileToggleLink from "../Links/ProfileToggleLink";

const ProfileToggleMenu = ({ toggleMenu }) => {
  return (
    <ul className='absolute bg-sky-200 w-[200px] right-0 rounded top-16'>
      {map(toggleMenu, (menu, index) => (
        <li
          key={uniqueId("toggleMenu")}
          className={`px-4 pb-2 pt-2 hover:bg-white  ${index !== 0 && ""}`}
        >
          <ProfileToggleLink
            icon={menu.icon}
            link={menu.link}
            title={menu.title}
            onClick={menu.onClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProfileToggleMenu;
