import React from "react";
import ProfileRouteLinks from "../../../Components/Profile/ProfileRouteLinks";
import { menuOrganization, menuUser, routes } from "./constants";
import ProfileRoutes from "../../../Components/Profile/ProfileRoutes";
import { useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";

const Profile = () => {
  const {
    userData: { organization },
  } = useSelector((state) => state.login);
  const width = useWindowSize();

  return (
    <div className='md:container h-full'>
      <div className='h-[45px] bg-white md:w-full md:h-full md:flex flex-col md:flex-row'>
        {/* <Outlet /> */}

        <ProfileRouteLinks menu={organization ? menuOrganization : menuUser} />

        <ProfileRoutes routes={routes} />
      </div>
    </div>
  );
};

export default Profile;
