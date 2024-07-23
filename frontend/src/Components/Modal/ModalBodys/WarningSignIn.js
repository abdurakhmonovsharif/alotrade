import React from "react";
import { Link } from "react-router-dom";

const WarningSignIn = ({ typeOfWarning }) => {
  return (
    <div className="max-w-[700px] bg-white py-4 md:py-10 px-4 rounded">
      <h2 className="text-[14px] md:text-[24px] font-bold text-center mb-6 ">
        {typeOfWarning === "user"
          ? `Уважаемый пользователь! Вы еще не зарегистрированы. Чтобы
        получить доступ к заказам, пожалуйста зарегистрируйтесь.`
          : `Уважаемый пользователь! Вы еще не зарегистрированы как компания. Чтобы
        получить доступ к заказам, пожалуйста зарегистрируйте вашу компанию.`}
      </h2>
      <div className="flex items-strech md:items-center md:justify-center flex-col md:flex-row gap-4 md:gap-0 ">
        <Link
          to={typeOfWarning === "user" ? "/sign-up" : "/sign-up/business"}
          className="p-2 bg-alotrade text-white text-center block rounded-xl md:mr-2"
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default WarningSignIn;
