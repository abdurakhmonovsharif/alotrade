import React from "react";
import sellerImg from "../../../assets/images/how_it_works.jpg";

const Seller = () => {
  return (
    <div className="flex items-start pt-4">
      <div className="max-w-[40%] md:block hidden">
        <img src={sellerImg} alt="sell" />
      </div>
      <div className="w-full flex flex-col px-6 md:px-0 items-center">
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">1.</span>
            Оставить заявку.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            Сначала вам надо будет оставить заявку на регистрацию компании.
          </p>
        </div>
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">2.</span>
            Наши менеджеры свяжутся с вами.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            После вашей заявки в течении двух часов наши менеджеры свяжутся с
            вами и подробнее ознакомят вас с нашей платформой.
          </p>
        </div>
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">3.</span>
            Регистрация компании.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            После подтверждении, наши менеджеры зарегистрируют вашу компанию на
            платформе ALOTRADE.UZ и по почте отправят вам доступ к личному
            кабинету.
          </p>
        </div>
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">4.</span>
            Добавление товаров.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            После этого в своем личном кабинете добавьте свои товары и услуги и
            безгранично торгуйте.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Seller;
