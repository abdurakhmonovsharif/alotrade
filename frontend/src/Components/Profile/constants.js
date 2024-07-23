import { universalToast } from "../ToastMessages/ToastMessages";

export const checkUser = ({
  firstname,
  lastname,
  phone,
  region,
  district,
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
  if (phone.length < 9) {
    universalToast("Введите номер телефона полностью!", "warning");
    return false;
  }
  if (!region) {
    universalToast("Выберите страну!", "warning");
    return false;
  }
  // if (!district) {
  //   universalToast("Выберите регион!", "warning");
  //   return false;
  // }
  return true;
};

export const checkPassword = ({
  password,
  oldPassword,
  confirmPassword,
  t,
}) => {
  if (password.length < 6 || oldPassword.length < 6) {
    universalToast("Пароль не должен быть менее 6 символов!", "warning");
    return false;
  }
  if (password !== confirmPassword) {
    universalToast("Неккоректный пароль!", "warning");
    return false;
  }
  return true;
};

export const checkOrganization = ({
  name,
  phones,
  categories,
  subcategories,
  tradetypes,
  region,
  district,
  t,
}) => {
  if (name.length < 1) {
    universalToast("Укажите название компании!", "warning");
    return false;
  }
  if (phones.phone1.length < 9) {
    universalToast("Введите номер телефона полоностью!", "warning");
    return false;
  }
  // if (phones.phone2.length < 9) {
  //   universalToast("Введите номер телефона полоностью!", "warning");
  //   return false;
  // }
  // if (phones.phone3.length < 9) {
  //   universalToast("Введите номер телефона полоностью!", "warning");
  //   return false;
  // }
  if (!categories.length) {
    universalToast("Выберите категорию!", "warning");
    return false;
  }
  // if (!subcategories.length) {
  //   universalToast("Выберите подкатегорию!", "warning");
  //   return false;
  // }
  if (!tradetypes.length) {
    universalToast("Выберите тип торговли!", "warning");
    return false;
  }
  if (!region) {
    universalToast("Выберите страну!", "warning");
    return false;
  }
  if (!district) {
    universalToast("Выберите регион!", "warning");
    return false;
  }
  return true;
};
