import React from "react";
import sellerImg from "../../../assets/images/how_it_works.jpg";

const Client = () => {
  return (
    <div className="flex items-start pt-4">
      <div className="max-w-[40%] md:block hidden">
        <img src={sellerImg} alt="sell" />
      </div>
      <div className="w-full flex flex-col px-6 md:px-0 items-center">
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">1.</span>
            Создать заявку на товар.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            Покупатель оставляет заявку на товар или услуги это займет всего
            минуту вашей времени.
          </p>
        </div>
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">2.</span>
            Поставщики предлагают цены.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            Мы отправим поставщикам уведомлению о вашем заказе. И они сами
            предложат вам цену на этот товар или услуги.
          </p>
        </div>
        <div className="max-w-[500px]">
          <h3 className="text-[21px] md:text-[26px] font-bold">
            <span className="text-[28px] text-alotrade mr-2">3.</span>
            Выбрать поставщика.
          </h3>
          <p className="text-[14px] md:text-[18px]">
            Из всех полученных предложений можете выбрать любого подходящего вам
            поставщика и заключите сделку.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Client;
