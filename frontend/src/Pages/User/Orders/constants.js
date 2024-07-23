export const checkRegisterOrder = ({
  tradetypes,
  categories,
  subcategories,
  name,
  // status,
  minPrice,
  maxPrice,
  currency,
  setErrors,
  description,
  region,
  district,
}) => {
  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (categories.length === 0) {
    setErrors("Выберите категорию!");
    return false;
  }
  // if (subcategories.length === 0) {
  //   setErrors("Выберите тип товара!");
  //   return false;
  // }
  if (name.length === 0) {
    setErrors("Введите название заказа!");
    return false;
  }

  if (description.length === 0) {
    setErrors("Введите описание заказа!");
    return false;
  }

  if (!region) {
    setErrors("Выберите страну!");
    return false;
  }

  if (!district) {
    setErrors("Выберите регион!");
    return false;
  }
  // if (status.length === 0) {
  //   setErrors("Mahsulot holati tanlanmagan");
  //   return false;
  // }

  if ((min || max) && min > max) {
    setErrors("Цена указана неправильно!");
    return false;
  }
  if ((min || max) && (min < 0 || max < 0)) {
    setErrors("Цена указана неправильно!");
    return false;
  }

  if ((min > 0 || max > 0) && currency === null) {
    setErrors("Выберите валюту!");
    return false;
  }

  return true;
};

export const filter = (t) => [
  {
    label: t("barcha buyurtmalar"),
    value: "all",
  },
  {
    label: t("mening buyurtmalarim"),
    value: "my",
  },
];
