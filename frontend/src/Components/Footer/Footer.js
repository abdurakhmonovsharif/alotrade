import React from "react";
import { BsFacebook, BsInstagram, BsTelegram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full absolute left-0 top-[100%] pt-10 pb-[6rem] md:pb-10 bg-alotrade flex justify-between items-center">
      <div className="container">
        <div className="flex items-center flex-col md:flex-row md:justify-between px-[30px]">
          <h2 className="text-[24px] block md:hidden md:text-[36px] font-bold text-white">
            alotrade.uz
          </h2>
          <div className="text-center md:mb-0">
            <h2 className="text-[26px] font-bold text-orange-400">
              Связаться с нами:
            </h2>
            <p className="text-white">+998992234244</p>
          </div>
          <h2 className="text-[24px] hidden md:block md:text-[36px] font-bold text-white">
            alotrade.uz
          </h2>
          <h2 className="text-[24px] mb-2 block md:hidden md:text-[36px] font-bold text-orange-400">
            Мы в соц-сетях
          </h2>
          <div className="flex items-center gap-4">
            <a href="https://t.me/alo24">
              <BsTelegram size={21} color="#fff" />
            </a>
            <a>
              <BsInstagram size={21} color="#fff" />
            </a>
            <a>
              <BsFacebook size={21} color="#fff" />
            </a>
            <a>
              <BsYoutube size={21} color="#fff" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
