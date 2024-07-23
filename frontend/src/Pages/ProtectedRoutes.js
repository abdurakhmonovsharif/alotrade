import { map, uniqueId } from 'lodash';
import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { CheckOrg, ProtectUserRoutes } from '../Config/protectedRoutes';
import EditOrder from './CreateOrder/EditOrder';
import SignIn from './Sign/Components/SignIn';
import SignUp from './Sign/Components/SignUp';
import AnnouncementPage from './User/Announcements/AnnouncementPage';
import Announcements from './User/Announcements/Announcements';
import CreateAnnouncements from './User/Announcements/CreateAnnouncements';

// pages -->

const otherRoutes = {
  path: '*',
  element: (
    <Navigate
      to={'/'}
      replace={true}
    />
  ),
};
// user pages
const UserReport = lazy(() => import('./User/Main/Main'));
const OrdersReport = lazy(() => import('./User/Orders/Orders'));
const ProductsReport = lazy(() => import('./User/Products/Products'));
const OffersReport = lazy(() => import('./User/Offers/Offers'));
const OrganizationsReport = lazy(() => import('./User/Organizations/Organizations'));
const Organization = lazy(() => import('./User/Organizations/Organization'));
const ProfileReport = lazy(() => import('./User/Profile/Profile'));
const CompanyReport = lazy(() => import('../Components/MainPageHeader/CompanyRegister'));
const DetailOrder = lazy(() => import('./User/DetailOrder/DetailOrder'));
const DetailProduct = lazy(() => import('./User/DetailProduct/DetailProduct'));
const CreateProduct = lazy(() => import('./CreateProduct/CreateProduct'));
const CreateOrder = lazy(() => import('./CreateOrder/CreateOrder'));
// <-- pages

// routes -->
const userRoutes = [
  {
    path: '/create_product',
    element: <CreateProduct />,
  },

  {
    path: '/edit_product',
    element: <CreateProduct />,
  },

  {
    path: '/create_announcement',
    element: <CreateAnnouncements />,
  },

  {
    path: '/create_order',
    element: <CreateOrder />,
  },

  {
    path: '/edit_order',
    element: <EditOrder />,
  },

  {
    path: '/profile/*',
    element: <ProfileReport />,
  },

  otherRoutes,
];

const unprotectedRoutes = [
  {
    path: '/',
    element: <UserReport />,
  },
  {
    path: '/orders',
    element: <OrdersReport />,
  },
  {
    path: '/announcements',
    element: <Announcements />,
  },
  {
    path: '/announcements/:id',
    element: <AnnouncementPage />,
  },
  {
    path: '/orders/:id',
    element: <DetailOrder />,
  },
  {
    path: '/products',
    element: <ProductsReport />,
  },

  {
    path: '/products/:id',
    element: <DetailProduct />,
  },
  {
    path: '/offers',
    element: <OffersReport />,
  },
  {
    path: '/organizations',
    element: <OrganizationsReport />,
  },
  {
    path: '/organizations_sub/:id',
    element: <OrganizationsReport />,
  },
  {
    path: '/organizations_sub/:id/:subID',
    element: <OrganizationsReport />,
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up/*', element: <SignUp /> },

  {
    path: '/companyregister',
    element: <CompanyReport />,
  },
  { path: '/organization', element: <Organization /> },
  otherRoutes,
];

const protectedRoutes = () => {
  return map(userRoutes, (route, index) => (
    <Route
      key={index}
      element={<ProtectUserRoutes />}
    >
      {route.path == '/create_announcement' || route.path == '/create_product' ? (
        <Route element={<CheckOrg />}>
          <Route
            exact
            key={uniqueId('route')}
            path={route.path}
            element={route.element}
          />
        </Route>
      ) : (
        <Route
          exact
          key={uniqueId('route')}
          path={route.path}
          element={route.element}
        />
      )}
    </Route>
  ));
};

export const unProtectedRoutes = () => {
  return map(unprotectedRoutes, (route) => (
    // route.path == "/orders/:id" ? (
    //   <Route element={<CheckBalanceForOrderRoute />}>
    //     <Route
    //       exact
    //       key={uniqueId("route")}
    //       path={route.path}
    //       element={route.element}
    //     />
    //   </Route>
    // ) : (
    <Route
      exact
      key={uniqueId('route')}
      path={route.path}
      element={route.element}
    />
  ));
};

export default protectedRoutes;
