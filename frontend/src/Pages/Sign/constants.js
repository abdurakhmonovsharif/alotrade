import { universalToast } from "../../Components/ToastMessages/ToastMessages";

export const checkHandler = ({
  firstname,
  lastname,
  password,
  phone,
  phones,
  region,
  district,
  url,
  categories,
  subcategories,
  name,
  tradeTypes,
  t,
}) => {
  if (firstname.length < 1) {
    universalToast("Введите имя!", "warning");
    return false;
  }
  if (lastname.length < 1) {
    universalToast("Введите фамилию!", "warning");
    return false;
  }
  if (phone) {
    if (phone.length < 9 || phone.length > 13) {
      if (phone.length > 9) {
        if (!phone.startsWith("+998")) {
          universalToast("Введите номер телефона полностью!", "warning");
          return false;
        }
      }
      universalToast("Введите номер телефона полностью!", "warning");
      return false;
    }
  }
  if (phones) {
    if (phones.phone1.length < 9 || phones.phone1.length > 13) {
      if (phones.phone1.length > 9) {
        if (!phones.phone1.startsWith("+998")) {
          universalToast("Введите номер телефона полностью!", "warning");
          return false;
        }
      }
      universalToast("Введите номер телефона полностью!", "warning");
      return false;
    }
  }
  if (!region) {
    universalToast("Выберите страну!", "warning");
    return false;
  }
  // if (!district) {
  //   universalToast("Выберите регион!", "warning");
  //   return false;
  // }
  if (password.length < 6) {
    universalToast("Пароль не должен быть менее 6 символов!", "warning");
    return false;
  }
  if (url === "business") {
    if (name === "") {
      universalToast("Укажите название компании!", "warning");
      return false;
    }
    if (categories.length === 0) {
      universalToast("Выберите категорию!", "warning");
      return false;
    }
    // if (subcategories.length === 0) {
    //   universalToast("Выберите подкатегорию!", "warning");
    //   return false;
    // }
    if (tradeTypes.length === 0) {
      universalToast("Выберите тип торговли!", "warning");
      return false;
    }
  }

  return true;
};

export const checkHandlerAddOrg = ({
  phone,
  region,
  district,
  url,
  categories,
  name,
  tradeTypes,
  t,
}) => {
  if (phone) {
    if (phone.length < 9 || phone.length > 13) {
      if (phone.length > 9) {
        if (!phone.startsWith("+998")) {
          universalToast("Введите номер телефона полностью!", "warning");
          return false;
        }
      }
      universalToast("Введите номер телефона полностью!", "warning");
      return false;
    }
  }

  if (!region) {
    universalToast("Выберите страну!", "warning");
    return false;
  }
  // if (!district) {
  //   universalToast("Выберите регион!", "warning");
  //   return false;
  // }
  if (url === "business") {
    if (name === "") {
      universalToast("Укажите название компании!", "warning");
      return false;
    }
    if (categories.length === 0) {
      universalToast("Выберите категорию!", "warning");
      return false;
    }
    // if (subcategories.length === 0) {
    //   universalToast("Выберите подкатегорию!", "warning");
    //   return false;
    // }
    if (tradeTypes.length === 0) {
      universalToast("Выберите тип торговли!", "warning");
      return false;
    }
  }

  return true;
};
