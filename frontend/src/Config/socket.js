import io from "socket.io-client";
const baseURL =
  process.env.REACT_APP_API_SOCKET_ENDPOINT || "http://185.154.13.191";

const socket = io("https://test.alotrade.uz/api");
const token = JSON.parse(localStorage.getItem("_grecaptcha"));
socket.auth = { token };

export default socket;
