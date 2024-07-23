import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UniversalModal from "../../Modal/UniversalModal";
import AddIcon from "./icons/AddIcon";
import OrderIcon from "./icons/OrderIcon";
import PriceIcon from "./icons/PriceIcon";
import ProductIcon from "./icons/ProductIcon";
import SellerIcon from "./icons/SellerIcon";
import TabContent from "./TabContent/TabContent";

const MainTabs = ({ handleCreateOrder }) => {
  const iconClass = "md:w-[40px] w-[30px] ";
  const {
    logged,
    userData: { organization },
  } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const sell = [
    {
      icon: <OrderIcon className={iconClass} />,
      title: "Все заявки",
      link: "/orders",
    },
    {
      icon: <AddIcon className={iconClass} />,
      title: "Добавить компанию",
      link: "/sign-up/business",
    },
    {
      title: "Тарифы",
      icon: <PriceIcon className={iconClass} />,
    },
  ];

  const buy = [
    {
      icon: <ProductIcon className={iconClass} />,
      title: "Товары",
      link: "/products",
    },
    {
      title: "Поставщики",
      icon: <SellerIcon className={iconClass} />,
      link: "/organizations",
    },
  ];

  const [content, setContent] = useState("buy");
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <div className="py-4">
            <div class="flex justify-between md:gap-4 md:justify-center mb-[20px]">
              <button
                className={`block w-full md:w-auto uppercase shadow md:ml-0 rounded-tr-none rounded-br-none rounded-l-xl border-r-0 border-1 border-[#03c1f6cc] ${
                  (content === "buy" && "bg-alotrade text-white") ||
                  " bg-white text-[#00c2cb]"
                } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
                onClick={() => setContent("buy")}
              >
                Покупать
              </button>
              <button
                className={`block w-full md:w-auto uppercase shadow md:ml-0 rounded-tl-none rounded-bl-none rounded-r-xl border-l-0 border-1 border-[#03c1f6cc] ${
                  (content === "sell" && "bg-alotrade text-white") ||
                  " bg-white text-alotrade"
                } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
                onClick={() => setContent("sell")}
              >
                Продавать
              </button>
            </div>
            {content === "buy" ? (
              <div className="flex md:justify-center gap-2 md:gap items-center w-full">
                <button
                  onClick={logged ? handleCreateOrder : openModal}
                  className="flex flex-col justify-center items-center drop-shadow-xl md:w-[250px] md:h-[150px] w-full h-[100px] bg-alotrade rounded-xl"
                >
                  <OrderIcon className={iconClass} />
                  <h2 className="md:text-[21px] text-[12px] font-bold text-white text-center mt-2">
                    Создать заявку
                  </h2>
                </button>

                {buy.map((el, ind) => (
                  <TabContent
                    icon={el?.icon}
                    link={el?.link}
                    title={el?.title}
                    key={ind}
                  />
                ))}
              </div>
            ) : (
              <div className="flex md:justify-center gap-2 md:gap items-center w-full">
                {sell.map((el, ind) => (
                  <TabContent
                    icon={el?.icon}
                    link={el.link}
                    title={el?.title}
                    key={ind}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        typeOfWarning={"user"}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
};

export default MainTabs;
