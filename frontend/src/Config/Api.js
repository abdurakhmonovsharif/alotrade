import axios from "axios";
import { logOut } from "../Pages/Sign/signSlice";
import Store from "./store";
const baseURL = process.env.REACT_APP_API_ENDPOINT;
const instance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL,
  // baseURL: "http://185.154.13.191/api",

  // baseURL: "http://18.182.27.141:3000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["cache-control"] = "no-cache";
    const token = JSON.parse(localStorage.getItem("_grecaptcha"));
    const adminToken = localStorage.getItem("admin-token");

    if (window.location.pathname.startsWith("/admin")) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    } else if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => response,
  ({ response: { data, status, config } }) => {
    if (config.url === "/order/get/getbyid") {
      return Promise.reject({ data, status });
    }
    if (!status) {
      return Promise.reject({ message: "Интернет недоступен" });
    } else if (status === 401) {
      if (window.location.pathname.startsWith("/admin")) {
        localStorage.removeItem("admin-token");
      } else {
        localStorage.removeItem("_grecaptcha");
      }

      Store.dispatch(logOut(data?.error || data?.message));
    } else if (status === 404) {
      return Promise.reject("Bunday manzil mavjud emas !");
    } else {
      return Promise.reject(data?.error || data?.message);
    }
  }
);

export default instance;
