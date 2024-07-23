import { toast } from "react-toastify";
// Long toast message with header and body
const toastWithHeader = (header, message) => (
  <div>
    <h1 className={"text-sm mb-1"}>{header}</h1>
    <p className={"text-xs"}>{message}</p>
  </div>
);

// Success Messages

export const successLoggedIn = () =>
  toast.success(
    toastWithHeader("Xush kelibsiz", "Kirish muvaffaqiyatli amalga oshirildi!")
  );

export const productExchangesFilial = () =>
  toast.error("Maxsulot kiritilmagan yoki filial tanlanmagan !");

// Universal Messages
export const universalToast = (message, type, option = {}) =>
  toast[type](message, option);
