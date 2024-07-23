import React from "react";

const CompanyRegister = () => {
  return (
    <div className="p-5 text-neutral-600">
      <p className="font-amazonbold text-lg">
        Уважаемый пользователь, вы еще не зарегистрированы как организация?
      </p>
      <p className="text-justify py-3">
        Если вы хотите участвовать во внутренней и внешней торговле и продавать
        свою продукцию по всему миру, присоединяйтесь к международной торговой
        площадке <span className="font-amazonbold">"ALOTRADE"</span>, где вас
        ждут заказы со всего мира.
      </p>
      <p>
        <span className="font-amazonbold">Номер телефона:</span>{" "}
        <a href="tel:+998992234244" className="text-primary-800">
          +998 99 223 42 44
        </a>
        ,{" "}
        <a href="tel:+998973666221" className="text-primary-800">
          +998 97 366 62 21
        </a>
      </p>
      <p>
        {" "}
        <span className="font-amazonbold">Tg:</span> t.me/sarvarmurodullayev
      </p>
    </div>
  );
};

export default CompanyRegister;
