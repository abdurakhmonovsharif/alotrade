import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { map, uniqueId } from "lodash";
import SideBar from "../Components/Admin/SideBar";
import AdminMain from "./Admin/AdminPages/AdminMain";
import Categories from "./Admin/AdminPages/Categories/Categories";
import RegionsPage from "./Admin/AdminPages/Regions/RegionsPage";
import OrganizationsPage from "./Admin/AdminPages/Organizations/OrganizationsPage";
import UsersPage from "./Admin/AdminPages/Users/UsersPage";
import AnnsPage from "./Admin/AdminPages/AnnsPage/AnnsPage";
import ProductsPage from "./Admin/AdminPages/Products/ProductsPage";
import OrdersPage from "./Admin/AdminPages/Orders/OrdersPage";

const adminRoutes = [
  { path: "/home", element: <AdminMain /> },
  { path: "/organizations/*", element: <OrganizationsPage /> },
  { path: "/categories/*", element: <Categories /> },
  { path: "/regions/*", element: <RegionsPage /> },
  { path: "/users/*", element: <UsersPage /> },
  { path: "/announcements/*", element: <AnnsPage /> },
  { path: "/products/*", element: <ProductsPage /> },
  { path: "/orders/*", element: <OrdersPage /> },

  {
    path: "*",
    element: <Navigate to={"/admin/home"} replace={true} />,
  },
];

const AdminPageRoutes = () => {
  useEffect(() => {
    document.title = "AloTrade - Admin";
  }, []);
  return (
    <div className='flex flex-row w-screen h-screen'>
      <SideBar />
      <div className='flex p-[35px] ml-[250px] w-[calc(100%_-_250px)]'>
        <Routes>
          {map(adminRoutes, (el, index) => (
            <Route
              path={el.path}
              element={el.element}
              key={uniqueId("route")}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPageRoutes;
