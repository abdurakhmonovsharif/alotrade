import { map, uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { getFavorites } from "../Products/productSlice";
import {
  clearAnnsData,
  getFavorites as getAnnsFavs,
} from "../Announcements/announcementSlice";

import { IoListCircleOutline, IoMegaphone } from "react-icons/io5";
import { Pagination } from "@mui/material";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import { Loading } from "@nextui-org/react";

const Favorites = () => {
  const dispatch = useDispatch();
  const {
    userData: { user },
    logged,
  } = useSelector((state) => state.login);

  const [currentProductsPage, setCurrentProductsPage] = useState(0);
  const [currentAnnsPage, setCurrentAnnsPage] = useState(0);

  const {
    products,
    totalCount,
    loading: loadingProducts,
  } = useSelector((state) => state.products);
  const {
    anns,
    totalDatas,
    loading: loadingAnns,
  } = useSelector((state) => state.anns);

  const [contentBody, setContentBody] = useState("anns");

  useEffect(() => {
    const data = {
      user: user?._id,
      page: currentProductsPage,
      count: 10,
    };
    dispatch(getFavorites(data));
  }, [dispatch, currentProductsPage]);

  useEffect(() => {
    const data = {
      user: user?._id,
      page: currentAnnsPage,
      count: 10,
    };
    dispatch(getAnnsFavs(data));
  }, [dispatch, currentAnnsPage]);

  useEffect(() => {
    dispatch(clearAnnsData());
  }, [dispatch]);

  return (
    <div className='flex flex-col pt-6 px-2 gap-5'>
      <div className='flex flex-row items-center w-full justify-start mr-5 gap-4 px-5 font-semibold'>
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
          onClick={() => setContentBody("products")}
          className='flex flex-row items-center gap-1'
        >
          <div className=' bg-alotrade p-[6px] rounded-full'>
            <IoListCircleOutline size={15} color={"#fff"} />
          </div>
          <div
            className={
              contentBody == "products"
                ? "text-[14px] px-2 py-1 rounded-lg bg-green-500 text-white"
                : "text-[14px] px-2 py-1 rounded-lg bg-neutral-200"
            }
          >
            Товары
          </div>
        </button>
      </div>
      {contentBody == "products" ? (
        <div className='flex flex-col items-center gap-4 w-full'>
          {loadingProducts ? (
            <Loading />
          ) : (
            <div className='grid grid-cols-2 px-2 gap-2 md:grid-cols-4 md:gap-3'>
              {map(products, (product) => (
                <ProductCard
                  logged={logged}
                  key={uniqueId()}
                  product={product}
                  //   editHandler={editHandler}
                  //   deleteHandler={deleteHandler}
                />
              ))}
            </div>
          )}
          <Pagination
            defaultPage={0}
            variant='outlined'
            color='primary'
            count={Math.ceil(totalCount / 10)}
            page={currentProductsPage + 1}
            onChange={(event, value) => {
              setCurrentProductsPage(value - 1);
            }}
          />
        </div>
      ) : (
        <div className='flex flex-col w-full gap-4 items-center'>
          {loadingAnns ? (
            <Loading />
          ) : (
            <div className='grid grid-cols-1 px-2 gap-2 md:grid-cols-3 md:gap-3'>
              {anns &&
                anns?.map((ann) => (
                  <AnnouncementCard
                    isCarousel={true}
                    key={uniqueId()}
                    ann={ann}
                    //   editHandler={editHandler}
                    //   deleteHandler={deleteHandler}
                  />
                ))}
            </div>
          )}
          <Pagination
            defaultPage={0}
            variant='outlined'
            color='primary'
            count={Math.ceil(totalDatas / 10)}
            page={currentAnnsPage + 1}
            onChange={(event, value) => {
              setCurrentAnnsPage(value - 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
