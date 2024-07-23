import { Avatar } from "@mui/material";
import { map, uniqueId } from "lodash";
import React from "react";
import {
  BsEnvelope,
  BsGlobe,
  BsInstagram,
  BsMailbox,
  BsTelegram,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const MyOrganization = () => {
  const { loading, userData } = useSelector((state) => state.login);
  return (
    <div className='flex flex-col gap-2 p-5'>
      <span className='ml-5 text-[16px] font-bold'>
        {"Данные Организации  "}
      </span>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white rounded-xl shadow-lg border-[1px] border-neutral-200'>
        <Avatar
          sx={{ width: "130px", height: "130px", flex: "none" }}
          src={userData?.organization?.image}
        />
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='flex flex-col leading-[18px]'>
            <span className='text-[22px] font-bold mb-3'>{`${userData?.organization?.name}`}</span>
            <h3 className='flex'>
              <span className='font-normal'>Тип торговли:</span>
              <p className='pl-2'>
                {map(userData?.organization?.tradetypes, (type) => (
                  <span key={uniqueId()} className='font-bold'>
                    {type?.name},
                  </span>
                ))}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-normal'>Тел: </span>
              <p className='pl-2 font-bold'>
                {userData?.organization?.phones?.phone1}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-normal'>Тел: </span>
              <p className='pl-2 font-bold'>
                {userData?.organization?.phones?.phone2}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-normal'>Тел: </span>
              <p className='pl-2 font-bold'>
                {userData?.organization?.phones?.phone3}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-normal'>Регион: </span>
              <p className='pl-2 font-bold'>
                {userData?.organization?.region?.label}
              </p>
            </h3>
            <h3 className='flex'>
              <span className='font-normal'>Город: </span>
              <p className='pl-2 font-bold'>
                {userData?.organization?.district?.label}
              </p>
            </h3>
            <div className='flex flex-row items-center justify-start gap-3 mt-4'>
              <span className='flex flex-row gap-2 items-center text-[16px] font-bold'>
                <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-green-500'>
                  <BsGlobe className='w-full text-white' />
                </div>{" "}
                {userData?.organization?.media?.site}
              </span>
              <span className='flex flex-row gap-2 items-center text-[16px] font-bold'>
                <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-green-500'>
                  <BsEnvelope className='w-full text-white' />
                </div>
                {userData?.organization?.email}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-end gap-3'>
            <span className='flex flex-row gap-2 items-center text-[16px] font-normal text-pink-500 '>
              <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-gradient-to-tr from-pink-600 to-orange-300'>
                <BsInstagram className='w-full text-white' />
              </div>{" "}
              <span className='flex text-right max-w-[200px] text-ellipsis overflow-hidden line-clamp-1'>
                {userData?.organization?.media?.instagram}
              </span>
            </span>
            <span className='flex flex-row gap-2 items-center justify-end text-[16px] font-normal text-sky-500'>
              <div className='w-[30px] h-[30px]  p-1 flex justify-center items-center  rounded-lg bg-sky-500'>
                <BsTelegram className='w-full text-white' />
              </div>
              <span className='flex text-right  max-w-[200px] text-ellipsis overflow-hidden line-clamp-1'>
                {userData?.organization?.media?.telegram}
              </span>
            </span>
          </div>
        </div>
      </div>
      <span className='ml-5 text-[16px] font-bold mt-3'>{"О Компании"}</span>
      <p className='px-4 py-2 bg-white rounded-xl shadow-lg border-[1px] border-neutral-200'>
        {userData?.organization?.description}
      </p>
    </div>
  );
};

export default MyOrganization;
