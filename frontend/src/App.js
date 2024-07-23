import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import { getUser } from "./Pages/Sign/signSlice";
import Admin from "./Pages/Admin/Admin";

// pages
const PageRoutes = lazy(() => import("./Pages/PageRoutes"));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("_grecaptcha"));
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className="font-amazon h-[100%] flex flex-col justify-between">
      <Suspense fallback={<Loader />}>
        <PageRoutes />
      </Suspense>
      {location.pathname !== "/offers" &&
        !location.pathname.includes("profile") && <Footer />}
    </div>
  );
}

export default App;
