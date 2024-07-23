import { configureStore } from "@reduxjs/toolkit";
import signReducer from "../Pages/Sign/signSlice";
import regionsReducer from "../Pages/Filter/regionsSlice.js";
import categoriesReducer from "../Pages/Category/categorySlice";
import tradeReducer from "../Pages/Filter/tradeSlice";
import ordersReducer from "../Pages/User/Orders/orderSlice";
import filterReducer from "../Pages/Filter/filterSlice";
import organizationReducer from "../Pages/User/Organizations/organizationSlice";
import productsReducer from "../Pages/User/Products/productSlice";
import annsReducer from "../Pages/User/Announcements/announcementSlice";

import offersReducer from "../Pages/User/Offers/offerSlice";
import categoryReducer from "../Pages/Admin/AdminPages/Categories/categorySlice";
import regionReducer from "../Pages/Admin/AdminPages/Regions/regionSlice";
import usersReducer from "../Pages/Admin/AdminPages/Users/userSlice";
import adsReducer from "../Pages/Admin/AdminPages/AnnsPage/adSlice";
import adminAnnsReducer from "../Pages/Admin/AdminPages/AnnsPage/annSlice";

import tradeTypesReducer from "../Pages/Admin/AdminPages/Organizations/tradeTypeSlice";
import adminOrganizationReducer from "../Pages/Admin/AdminPages/Organizations/organizationSlice";
import adminProductsReducer from "../Pages/Admin/AdminPages/Products/productSlice";
import adminOrdersReducer from "../Pages/Admin/AdminPages/Orders/orderSlice";

export default configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    login: signReducer,
    regions: regionsReducer,
    categories: categoriesReducer,
    trade: tradeReducer,
    orders: ordersReducer,
    filter: filterReducer,
    organizations: organizationReducer,
    adminOrganizations: adminOrganizationReducer,
    products: productsReducer,
    offers: offersReducer,
    category: categoryReducer,
    region: regionReducer,
    adminUsers: usersReducer,
    ads: adsReducer,
    tradeTypes: tradeTypesReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
    adminAnns: adminAnnsReducer,
    anns: annsReducer,
  },
});
