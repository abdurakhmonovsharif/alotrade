export const filter = [
  {
    label: "barcha mahsulotlar",
    value: "all",
  },
  {
    label: "mening mahsulotlarim",
    value: "my",
  },
];

export const checkRegisterProduct = ({
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
}) => {
  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (categories.length === 0) {
    setErrors("Выберите категорию!");
    return false;
  }

  if (name.length === 0) {
    setErrors("Введите название товара!");
    return false;
  }

  if (description.length === 0) {
    setErrors("Введите описание товара!");
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
