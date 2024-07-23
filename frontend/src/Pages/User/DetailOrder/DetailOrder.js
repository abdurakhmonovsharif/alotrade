import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  clearErrorOrders,
  clearShowErrorModal,
  getOrderById,
  getOrders,
} from "../Orders/orderSlice";
import SimpleImageSlider from "react-simple-image-slider";
import DetailOrderCard from "./Components/DetailOrderCard";
import useWindowSize from "../../../hooks/useWindowSize";
import CustomSlider from "../../../Components/CustomImgSlider/CustomSlider";
import EmblaCarousel from "../../../Components/EmblaCarousel/EmblaCarousel";
import Carousel from "react-multi-carousel";
import OrderCard from "../../../Components/OrderCard/OrderCard";
import { map, uniqueId } from "lodash";
import OrderCardMain from "../../../Components/OrderCard/OrderCardMain";
import { Loading } from "@nextui-org/react";

const DetailOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { width } = useWindowSize();

  const { order, loading, showErrorModal, error } = useSelector(
    (state) => state.orders
  );

  const { orders } = useSelector((state) => state.orders);

  const [imagesForSlide, setImageForSlide] = useState([]);

  const { logged } = useSelector((state) => state.login);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1.5,
      slidesToSlide: 1.5,
      partialVisibilityGutter: 40, // optional, default to 1.
    },
  };

  useEffect(() => {
    dispatch(clearShowErrorModal());
    fetchOrderById();
  }, [dispatch, id]);

  const fetchOrderById = async () => {
    try {
      await dispatch(getOrderById({ id })).then(({ error }) => {
        if (!error) {
          const data = {
            page: 0,
            count: 10,
            order: "all",
            categories: [],
            subcategories: [],
            subcategories2: [],
            tradetypes: [],
            regions: [],
            districts: [],
            user: "64875c6305515f992e2359c7",
            name: "",
          };
          dispatch(getOrders(data));
        }
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (order?._id) {
      setImageForSlide([...order.images]);
    }
  }, [order]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Navigate to={"/orders"} replace />
  ) : showErrorModal ? (
    <Navigate to={"/orders"} state={{ error: true }} replace />
  ) : (
    <div className='w-full bg-white'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 pt-6'>
          <div className='flex justify-center md:block md:col-span-2 w-full'>
            {imagesForSlide.length > 0 && (
              <EmblaCarousel options={{}} slides={imagesForSlide} />
            )}
          </div>

          <div className='flex flex-col gap-5 py-8'>
            <div className='flex gap-[4px]'>
              <h2 className='text-[24px] md:text-[28px] font-bold text-ellipsis line-clamp-2'>
                {order?.name}
              </h2>
            </div>
            <div className='flex flex-row items-center gap-5 text-[18px] font-medium'>
              <span>Цена:</span>
              <h2 className='text-[30px] text-orange-500 font-bold'>
                {(order?.maxPrice || "").toLocaleString("ru-RU")}{" "}
                {order?.currency}
              </h2>
            </div>
            <div className='flex items-center gap-[4px] text-[14px] font-medium'>
              <span>Регион:</span>
              <h2 className='text-[16px] font-bold'>
                {order?.region?.label}, {order?.district?.label}
              </h2>
            </div>
            <div className='col-span-1 mt-10'>
              <DetailOrderCard id={id} user={order?.user} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2 py-[30px]'>
          <div className='col-span-2 bg-white px-2 md:px-6 pt-2 mb-4 md:mb-0'>
            <h2 className='text-[22px] md:text-[32px] font-bold'>Описание</h2>
            <p className='text-[19px] md:text-[21px] whitespace-pre-wrap'>
              {order?.description}
            </p>
          </div>
        </div>
      </div>
      <div className='pt-6 pb-[60px] bg-white md:px-10'>
        <h2 className='text-[21px] md:text-[32px] font-bold mb-4 ml-10'>
          Другие заказы
        </h2>
        <Carousel
          responsive={responsive}
          sliderClass='flex justify gap-2 md:gap-4 '
          autoPlay={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          infinite={true}
          itemClass=''
        >
          {map(orders, (order) => (
            <OrderCardMain
              logged={logged}
              key={uniqueId()}
              order={order}
              isProductPage={true}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DetailOrder;
