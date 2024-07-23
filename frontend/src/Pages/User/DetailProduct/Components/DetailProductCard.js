import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
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
import { Modal } from "@nextui-org/react";
import { getInstagramLink, getTelegramLink } from "../../../../Config/links";

const DetailProductCard = ({ id, user }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(!show);
  };
  const { logged } = useSelector((state) => state.login);

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

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
              <h3 className='w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 text-lg'>
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
            Перейти на страницу компании
          </Link>

          <div className='flex flex-col py-3 gap-3'>
            <span className='text-[16px] text-orange-500'>
              Связаться с поставщиком
            </span>
            <div className='flex flex-row gap-3 w-full justify-center items-center'>
              <a
                target='_blank'
                onClick={(e) => !user?.media?.instagram && e.preventDefault()}
                style={{ filter: !user?.media?.instagram && "grayscale(90%)" }}
                href={`${getInstagramLink(user?.media?.instagram)}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-gradient-to-tr from-rose-400 via-fuchsia-500 to-indigo-500'
              >
                <BsInstagram className='w-full text-white text-[28px]' />
              </a>
              <a
                target='_blank'
                style={{ filter: !user?.media?.telegram && "grayscale(90%)" }}
                onClick={(e) => !user?.media?.telegram && e.preventDefault()}
                href={`${getTelegramLink(user?.media?.telegram)}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-sky-500'
              >
                <BsTelegram className='w-full text-white text-[28px]' />
              </a>
              {/* <a
                target='_blank'
                href={`${user?.media?.telegram}`}
                className='w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-green-600'
              >
                <BsFillChatDotsFill className='w-full text-white text-[28px]' />
              </a> */}
              <button
                disabled={
                  !user?.phones?.phone1 &&
                  !user?.phones?.phone2 &&
                  !user?.phones?.phone3
                }
                onClick={handler}
                // href={`tel:${user?.phones?.phone1 || " - "}`}
                className={
                  "w-[50px] h-[50px] p-1 flex justify-center items-center  rounded-xl bg-green-500 disabled:grayscale-[90%]"
                }
              >
                <BsTelephoneFill className='w-full text-white text-[28px]' />
              </button>
            </div>
          </div>

          <div className='flex flex-col px-8 py-4'>
            <h3 className='flex'>
              <span className='font-bold'>Адрес: </span>
              <p className='ml-2 font-normal'>
                {user?.address == "" || !user?.address ? " - " : user?.address}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-bold'>Сайт: </span>
              <a
                target='_blank'
                href={
                  (user?.media?.site?.startsWith("https://")
                    ? user?.media?.site
                    : `https://${user?.media?.site}`) || " - "
                }
                className='ml-2 font-normal'
              >
                {user?.media?.site || " - "}
              </a>
            </h3>
          </div>
        </div>
      </div>
      <UniversalModal
        isOpen={width < 720 && show}
        body={"phone"}
        phone={user?.phone?.includes("+") ? user?.phone : "+" + user?.phone}
        closeModal={() => setShow(false)}
      />
      <Modal
        css={{
          // width: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        closeButton
        aria-labelledby='modal-title'
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className='flex flex-col gap-2 items-center w-full pb-5'>
            {user?.phones?.phone1 && (
              <a
                className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                href={`tel:${user?.phones?.phone1 || " - "}`}
              >
                <BsTelephoneFill />
                {`${user?.phones?.phone1 || " - "}`}
              </a>
            )}
            {user?.phones?.phone2 && (
              <a
                className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                href={`tel:${user?.phones?.phone2 || " - "}`}
              >
                <BsTelephoneFill />
                {`${user?.phones?.phone2 || " - "}`}
              </a>
            )}
            {user?.phones?.phone3 && (
              <a
                className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                href={`tel:${user?.phones?.phone3 || " - "}`}
              >
                <BsTelephoneFill />
                {`${user?.phones?.phone3 || " - "}`}
              </a>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailProductCard;
