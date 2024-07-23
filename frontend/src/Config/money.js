import { Base64 } from "js-base64";

export const moneyPattern = (amount) => {
  return amount ? amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
};

export const fillBalance = (amount, userId, firstname, lastname) => {
  const stringForBase64 = `m=647e2e1c91ddb4af598d02a1;ac.user_id=${userId};ac.first_name=${firstname};ac.last_name=${lastname};a=${
    amount * 100
  };c=https://alotrade.uz/profile/user;`;
  const base64 = Base64.encode(stringForBase64);

  const url = `https://checkout.paycom.uz/${base64}`;
  window.open(url, "_self");
};
