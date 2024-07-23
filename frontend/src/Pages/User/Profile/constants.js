import React from "react";
import {
  IoBusinessSharp,
  IoCartOutline,
  IoKeyOutline,
  IoListCircleOutline,
  IoMegaphone,
  IoPersonCircleOutline,
  IoRadio,
} from "react-icons/io5";
import { GiArcheryTarget } from "react-icons/gi";
import { BsMegaphoneFill } from "react-icons/bs";
import { MdFavorite, MdOutlineProductionQuantityLimits } from "react-icons/md";
import EditUser from "../../../Components/Profile/EditUser";
import { Navigate } from "react-router-dom";
import EditPassword from "../../../Components/Profile/EditPassword";
import EditOrganization from "../../../Components/Profile/EditOrganization";
import MyProducts from "../../../Components/Profile/MyProducts";
import MyOrders from "../../../Components/Profile/MyOrders";
import Favorites from "./Favorites";
import MyAnnouncements from "../Announcements/MyAnnouncements";
import CreateAnnouncements from "../Announcements/CreateAnnouncements";
import ForYou from "../ForYou/ForYou";
import MyOrganization from "../../../Components/Profile/MyOrganization";

export const menuUser = [
  {
    path: "/profile/user",
    title: "Пользователь",
    icon: <IoPersonCircleOutline size={26} color={"#444"} />,
    class: "rounded-l-xl md:rounded",
  },
  {
    path: "/profile/for-you",
    title: "Для вас",
    icon: <IoMegaphone size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  // {
  //   path: "/profile/products",
  //   title: "Мои товары",
  //   icon: <IoCartOutline size={26} color={"#444"} />,
  //   class: "rounded-none md:rounded",
  // },
  {
    path: "/profile/orders",
    title: "Мои заказы",
    icon: <IoListCircleOutline size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/announcements",
    title: "Рекламный кабинет",
    icon: <GiArcheryTarget size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/password",
    title: "Пароль",
    icon: <IoKeyOutline size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/favorites",
    title: "Избранные",
    icon: <MdFavorite size={26} color={"#444"} />,
    class: "rounded-r-xl md:rounded",
  },
];

export const menuOrganization = [
  {
    path: "/profile/user",
    title: "Профиль",
    icon: <IoPersonCircleOutline size={26} color={"#444"} />,
    class: "rounded-l-xl md:rounded",
  },
  {
    path: "/profile/organization",
    title: "Моя Организация",
    icon: <IoBusinessSharp size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/for-you",
    title: "Для вас",
    icon: <IoMegaphone size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/products",
    title: "Мои товары",
    icon: <IoCartOutline size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/orders",
    title: "Мои заказы",
    icon: <IoListCircleOutline size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/announcements",
    title: "Рекламный кабинет",
    icon: <GiArcheryTarget size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },

  {
    path: "/profile/password",
    title: "Пароль",
    icon: <IoKeyOutline size={26} color={"#444"} />,
    class: "rounded-none md:rounded",
  },
  {
    path: "/profile/favorites",
    title: "Избранные",
    icon: <MdFavorite size={26} color={"#444"} />,
    class: "rounded-r-xl md:rounded",
  },
];

export const routes = [
  {
    path: "/user",
    element: <EditUser />,
  },
  {
    path: "/organization",
    element: <MyOrganization />,
  },
  {
    path: "/products",
    element: <MyProducts />,
  },
  {
    path: "/orders",
    element: <MyOrders />,
  },
  {
    path: "/for-you",
    element: <ForYou />,
  },
  {
    path: "/announcements/*",
    element: <MyAnnouncements />,
  },
  {
    path: "/password",
    element: <EditPassword />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "*",
    element: <Navigate to={"/user"} replace={true} />,
  },
];
