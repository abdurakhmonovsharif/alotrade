import React, { useState } from "react";
import Client from "./Client";
import Seller from "./Seller";

const HowItWorks = () => {
  const [content, setContent] = useState("buy");

  return (
    <div className="">
      <div className="container">
        <div className="py-[30px]">
          <h2 className="md:text-[36px] text-[16px] font-bold mb-6">
            Как это работает?
          </h2>
          <div class="flex justify-between md:gap-4 md:justify-center mb-[20px]">
            <button
              className={`block w-full md:w-auto uppercase shadow md:ml-0 rounded-tr-none rounded-br-none rounded-l-xl border-r-0 border-1 border-[#03c1f6cc] ${
                (content === "buy" && "bg-alotrade text-white") ||
                " bg-white text-[#00c2cb]"
              } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
              onClick={() => setContent("buy")}
            >
              Покупатель
            </button>
            <button
              className={`block w-full md:w-auto uppercase shadow md:ml-0 rounded-tl-none rounded-bl-none rounded-r-xl border-l-0 border-1 border-[#03c1f6cc] ${
                (content === "sell" && "bg-alotrade text-white") ||
                " bg-white text-alotrade"
              } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
              onClick={() => setContent("sell")}
            >
              Поставщик
            </button>
          </div>
          {content === "sell" ? <Seller /> : <Client />}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
