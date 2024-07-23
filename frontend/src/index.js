import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Store from "./Config/store";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "./tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-modern-drawer/dist/index.css";
import "./i18n";
import AdminPageRoutes from "./Pages/AdminPageRoutes";
import Login from "./Pages/Admin/Login";
import { AuthenticatedRoutes, ProtectRoutes } from "./Config/protectedRoutes";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
  palette: {
    alotrade: {
      main: "#00c2cb",
      contrastText: "#fff",
    },
  },
});

const renderElement = (
  <>
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <Routes>
            <Route element={<AuthenticatedRoutes />}>
              <Route exact path='/admin/login' element={<Login />} />
            </Route>
            <Route element={<ProtectRoutes />}>
              <Route exact path='/admin/*' element={<AdminPageRoutes />} />
            </Route>
            <Route path='*' element={<App />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </Router>
    <ToastContainer
      position='top-right'
      theme={"colored"}
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  </>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(renderElement, rootElement);
} else {
  root.render(renderElement);
}
