import React, { useEffect } from "react";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import { Pagination } from "@mui/material";
import Filter from "../../Filter/Filter";
import { useState } from "react";
import PageHeader from "../../../Components/PageHeaders/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../Products/constants";
import {
  IoAtCircleOutline,
  IoListCircleOutline,
  IoListOutline,
  IoMegaphone,
} from "react-icons/io5";
import {
  clearAnnsData,
  getForYouAnns,
} from "../Announcements/announcementSlice";
import {
  getOrders,
  getOrdersCount,
  getOrdersForUser,
} from "../Orders/orderSlice";
import { map, uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import OrderCard from "../../../Components/OrderCard/OrderCard";
import { getTranslations } from "../../../translation";
import { Loading } from "@nextui-org/react";

const ForYou = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);

  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPage, setOrdersPage] = useState(0);

  const {
    orders,
    totalCount: totalOrdersDatas,
    loading: loadingOrders,
  } = useSelector((state) => state.orders);

  const [contentBody, setContentBody] = useState("anns");

  const {
    anns,
    totalDatas,
    loading: loadingAnns,
  } = useSelector((state) => state.anns);

  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  const fetchAllData = () => {
    const data = {
      page: currentPage,
      count: 10,
    };
    dispatch(getForYouAnns(data));
  };
  useEffect(() => {
    fetchAllData();
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  useEffect(() => {
    const categories = organization?.categories?.map((el) => el.value);

    const data = {
      page: ordersPage,
      count: 10,
      order: "all",
      // categories,
      // subcategories: [],
      // subcategories2: [],
      // tradetypes: [],
      // regions: [],
      // districts: [],
      // user: user?._id,
      // name: "",
    };
    dispatch(getOrdersForUser(data));

    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ordersPage]);

  useEffect(() => {
    dispatch(clearAnnsData());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-4 p-3 items-center w-full'>
      <div className='flex flex-col md:flex-row items-center md:items-start mt-4 w-full gap-1 md:gap-10'>
        {/* <div className='flex flex-row w-full md:w-fit'>
          <Filter
            filterBody={filterBody}
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
          />
          <PageHeader
            isOrganization={!!organization}
            filter={filter}
            setFilterBody={setFilterBody}
            setFilterVisible={setFilterVisible}
            filterBtnClick={() => setFilterVisible(!filterVisible)}
          />
        </div> */}
        {/* {organization && ( */}
        <div className='flex flex-row items-center w-full justify-center md:justify-start px-5 md:mr-5 gap-4 font-semibold'>
          <button
            onClick={() => setContentBody("anns")}
            className='flex flex-row items-center gap-1'
          >
            <div className=' bg-alotrade p-[6px] rounded-full'>
              <IoMegaphone size={15} color={"#fff"} />
            </div>
            <div
              className={
                contentBody == "anns"
                  ? "text-[14px] px-2 py-1 rounded-lg bg-green-500 text-white"
                  : "text-[14px] px-2 py-1 rounded-lg bg-neutral-200"
              }
            >
              Объявление
            </div>
          </button>
          <button
            onClick={() => setContentBody("orders")}
            className='flex flex-row items-center gap-1'
          >
            <div className=' bg-alotrade p-[6px] rounded-full'>
              <IoListOutline size={15} color={"#fff"} />
            </div>
            <div
              className={
                contentBody == "orders"
                  ? "text-[14px] px-2 py-1 rounded-lg bg-green-500 text-white"
                  : "text-[14px] px-2 py-1 rounded-lg bg-neutral-200"
              }
            >
              Заказы
            </div>
          </button>
        </div>
        {/* )} */}
      </div>

      {contentBody == "anns" ? (
        <div className='flex flex-col items-center md:px-5 w-full'>
          {loadingAnns ? (
            <Loading />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 my-5 w-full'>
              {anns?.map((el, index) => (
                <AnnouncementCard key={index} ann={el} isCarousel={true} />
              ))}
            </div>
          )}
          <Pagination
            defaultPage={0}
            variant='outlined'
            color='primary'
            count={Math.ceil(totalDatas / 10)}
            page={currentPage + 1}
            onChange={(event, value) => {
              setCurrentPage(value - 1);
            }}
          />
        </div>
      ) : (
        <div className='flex flex-col items-center w-full'>
          <div className='md:px-4 flex flex-col gap-[13px] md:gap-[20px] w-full'>
            {loadingOrders ? (
              <Loading />
            ) : (
              map(orders, (order) => (
                <OrderCard
                  translations={translations}
                  logged={logged}
                  key={uniqueId()}
                  order={order}
                />
              ))
            )}
          </div>
          {totalDatas > 0 && (
            <div className='flex justify-center py-2'>
              <Pagination
                defaultPage={1}
                variant='outlined'
                color='primary'
                count={Math.ceil(totalOrdersDatas / 10)}
                page={ordersPage + 1}
                onChange={(event, value) => {
                  setCurrentPage(value - 1);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForYou;
