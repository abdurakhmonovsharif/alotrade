import React from "react";
import { Route, Routes } from "react-router-dom";
import { map, uniqueId } from "lodash";

const ProfileRoutes = ({ routes }) => {
  return (
    <div className="w-full bg-white-900 rounded shadow-lg pb-[70px]">
      <Routes>
        {map(routes, (route) => (
          <Route
            exact
            key={uniqueId("profile")}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
};

export default ProfileRoutes;
