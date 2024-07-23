import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrdersCount } from "../Orders/orderSlice";
import { map, uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../../translation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OrderCardMain from "../../../Components/OrderCard/OrderCardMain";
import { Link, useNavigate } from "react-router-dom";
import UniversalModal from "../../../Components/Modal/UniversalModal";

const OrderCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);
  const { orders } = useSelector((state) => state.orders);
  const {
    order,
    categories,
    subcategories,
    tradetypes,
    regions,
    districts,
    name,
  } = useSelector((state) => state.filter);
  const { logged, userData } = useSelector((state) => state.login);
  //   const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalDatas, setTotalDatas] = useState(0);
  const countPage = 10;
  const { user } = userData;
  const { organization } = userData;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.3,
      slidesToSlide: 1.3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 80, // optional, default to 1.
    },
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const data = {
      page: 0,
      count: 4,
      order,
      categories: [],
      subcategories: [],
      tradetypes: [],
      regions: [],
      districts: [],
      user: user?._id,
      name,
    };
    setCurrentPage(0);
    dispatch(getOrders(data));
    dispatch(getOrdersCount(data)).then(
      ({ error, payload: { totalCount } }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );
  }, [
    dispatch,
    order,
    categories,
    subcategories,
    tradetypes,
    regions,
    districts,
    user,
    name,
  ]);
  useEffect(() => {
    const data = {
      page: currentPage,
      count: countPage,
      order,
      categories,
      subcategories,
      tradetypes,
      regions,
      districts,
      user: user?._id,
      name,
    };
    dispatch(getOrders(data));
    dispatch(getOrdersCount(data)).then(
      ({ error, payload: { totalCount } }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, order, currentPage, countPage]);
  return (
    <div className='pb-3 md:pb-10 pt-3 md:pt-8 w-screen md:w-full md:container'>
      <div className='grid grid-cols-2 sm:grid-cols-3 items-center w-full px-5 sm:px-0'>
        <button
          onClick={() => {
            logged
              ? organization?.is_active
                ? navigate("/create_order")
                : setModalVisibleOrg(true)
              : openModal();
          }}
          className='hidden sm:flex uppercase shadow md:ml-0 w-fit h-fit bg-alotrade hover:bg-alotrade/80 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          {"Создать заявку"}
        </button>
        <h2 className='md:text-[36px] text-[16px] font-bold justify-self-start sm:justify-self-center ml-2 md:ml-0'>
          {"ЗАКАЗЫ"}
        </h2>
        <Link
          to='/orders'
          className='block uppercase shadow md:ml-0 justify-self-end w-fit h-fit  bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          Все заявки
        </Link>
      </div>
      <Carousel
        partialVisible
        responsive={responsive}
        sliderClass='flex justify gap-[8px] md:gap-[10px]'
        autoPlay={true}
        autoPlaySpeed={3000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        infinite={true}
        itemClass='pb-5 pt-5'
      >
        {map(orders, (order) => (
          <OrderCardMain
            translations={translations}
            logged={logged}
            key={uniqueId()}
            order={order}
          />
        ))}
      </Carousel>
      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        typeOfWarning={"user"}
        closeModal={() => setModalVisible(false)}
      />
      <UniversalModal
        body={"warningOrg"}
        isOpen={modalVisibleOrg}
        closeModal={() => setModalVisibleOrg(false)}
        toggleModal={() => setModalVisibleOrg(false)}
      />
    </div>
  );
};

export default OrderCarousel;
