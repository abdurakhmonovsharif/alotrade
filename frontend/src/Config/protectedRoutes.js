import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";

export const ProtectRoutes = () => {
  const token = localStorage.getItem("admin-token");
  //   const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to='/admin/login' exact />;
};

export const ProtectUserRoutes = () => {
  const token = localStorage.getItem("_grecaptcha");
  //   const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to='/' exact />;
};

export const CheckOrg = () => {
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);
  return organization ? (
    organization?.is_active ? (
      <Outlet />
    ) : (
      <Navigate to='/' exact />
    )
  ) : (
    <Outlet />
  );
};

export const AuthenticatedRoutes = () => {
  const token = localStorage.getItem("admin-token");
  //   const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to='/admin' exact />;
};

export const CheckBalanceForOrderRoute = () => {
  const [ordersum, setOrdersum] = useState(null);
  useEffect(() => {
    getOrdersum();
  }, []);
  const getOrdersum = async () => {
    const ordersum = await fetchPricePerSend();
    setOrdersum(ordersum);
  };
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  return ordersum ? (
    user?.balance > ordersum ? (
      <Outlet />
    ) : (
      <Navigate to='/orders' exact />
    )
  ) : (
    <div></div>
  );

  // try {
  //
  //   if (user?.balance > ordersum) {
  //     return ;
  //   } else {
  //     return ;
  //   }
  // } catch (err) {
  //   return <Navigate to='/orders' exact />;
  // }
};

const fetchPricePerSend = async () => {
  const res = await Api.get("/extra/cost");
  return res.data[0]?.ordersum;
};
