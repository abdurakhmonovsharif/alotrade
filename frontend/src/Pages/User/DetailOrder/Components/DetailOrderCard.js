import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UniversalModal from "../../../../Components/Modal/UniversalModal";
import useWindowSize from "../../../../hooks/useWindowSize";
import {
  BsFillChatDotsFill,
  BsInstagram,
  BsMessenger,
  BsPhone,
  BsTelegram,
  BsTelephone,
  BsTelephoneFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const DetailOrderCard = ({ id, user }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(!show);
  };
  const { logged } = useSelector((state) => state.login);

  return (
    <>
      <div
        className='
            bg-alotrade/20
            rounded-xl
            overflow-hidden
            text-center
            p-4
            lg:px-8
            wow
            fadeInUp
        '
      >
        {/* <h3 class="font-semibold text-black mb-2 text-2xl">
        Join our newsletter!
      </h3> */}
        <div className='flex items-center flex-col'>
          <div className='flex justify-center p-4 pb-2'>
            {user?.image ? (
              <img
                src={user?.image}
                alt={"logo"}
                className='w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-neutral-100'
              />
            ) : (
              <h3 className='rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 text-lg'>
                alo
              </h3>
            )}
          </div>
          <div className='font-semibold text-black mb-2 text-2xl'>
            {user?.name}
          </div>
        </div>
        {/* <p className='text-right text-base text-black mb-8'>
          {user?.region}, {user?.district}
        </p> */}
        <div className=''>
          <Link
            to='/organization'
            state={{ _id: user?._id }}
            class='
          w-full
            text-center
            text-sm
            font-medium

            rounded
            block
            mb-6
            cursor-pointer
            transition
            duration-300
            ease-in-out
             bg-alotrade py-2 text-white
        '
          >
            Перейти на страницу заказчика
          </Link>

          <div className='flex flex-col py-3 gap-3'>
            <span className='text-[16px] text-orange-500'>
              Связаться с заказчиком
            </span>
            <div className='flex flex-row gap-3 w-full justify-center items-center'>
              {/* <a
                href={`${user?.instagram}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-gradient-to-tr from-rose-400 via-fuchsia-500 to-indigo-500'
              >
                <BsInstagram className='w-full text-white text-[28px]' />
              </a>
              <a
                href={`${user?.telegram}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-sky-500'
              >
                <BsTelegram className='w-full text-white text-[28px]' />
              </a> */}
              {/* <a
                href={`${user?.telegram}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-green-600'
              >
                <BsFillChatDotsFill className='w-full text-white text-[28px]' />
              </a> */}
              <a
                href={`tel:${user?.phone || " - "}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-green-500'
              >
                <BsTelephoneFill className='w-full text-white text-[28px]' />
              </a>
            </div>
          </div>

          {/* <div className='flex flex-col px-8 py-4'>
            <h3 className='flex'>
              <span className='font-bold'>Адрес: </span>
              <a
                href={`tel:${user?.address || " - "}`}
                className='ml-2 font-normal'
              >
                {user?.address || " - "}
              </a>
            </h3>
            <h3 className='flex'>
              <span className='font-bold'>Сайт: </span>
              <a
                href={`tel:${user?.webSite || " - "}`}
                className='ml-2 font-normal'
              >
                {user?.webSite || " - "}
              </a>
            </h3>
          </div> */}
        </div>
      </div>
      <UniversalModal
        isOpen={width < 720 && show}
        body={"phone"}
        phone={user?.phone.includes("+") ? user?.phone : "+" + user?.phone}
        closeModal={() => setShow(false)}
      />
    </>
  );
};

export default DetailOrderCard;
