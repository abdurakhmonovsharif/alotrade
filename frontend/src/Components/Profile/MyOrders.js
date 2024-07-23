import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrdersCount,
  getOrders,
  updateOrderPosition,
} from "../../Pages/User/Orders/orderSlice";
import { map, uniqueId } from "lodash";
// import { filter } from "./constants";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import UniversalModal from "../Modal/UniversalModal";
import { getTranslations } from "../../translation";
import PageHeader from "../PageHeaders/PageHeader";
import OrderCard from "../OrderCard/OrderCard";

import AddButton from "../Buttons/AddButton";
import Filter from "../../Pages/Filter/Filter";
import { filter } from "../../Pages/User/Orders/constants";
import MyCard from "../OrderCard/MyCard";
import { Pagination } from "@mui/material";
import { Loading } from "@nextui-org/react";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);
  //   const filterData = filter(t);
  const navigate = useNavigate();
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);
  const { loading, orders } = useSelector((state) => state.orders);
  const {
    order,
    categories,
    subcategories,
    tradetypes,
    regions,
    districts,
    name,
  } = useSelector((state) => state.filter);
  const [orderId, setOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalDatas, setTotalDatas] = useState(0);
  const countPage = 10;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState(null);

  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterBody, setFilterBody] = useState(null);

  const closeHandler = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openModal = (body) => {
    setModalBody(body);
    setModalVisible(true);
    setOrderId(null);
  };

  const deleteHandler = (id) => {
    setOrderId(id);
    setModalBody("approve");
    setModalVisible(true);
  };

  const editHandler = (id) => {
    setOrderId(id);
    setModalBody("createOrder");
    setModalVisible(true);
  };

  const updatePosition = (id) => {
    dispatch(updateOrderPosition({ id }));
  };

  //   const handleFilter = (e) => {
  //     const value = e.target.value;
  //     dispatch(filterOrder(value));
  //   };

  const deleteOrderById = () => {
    orderId &&
      dispatch(deleteOrder({ id: orderId })).then(({ error }) => {
        if (!error) {
          setModalVisible(false);
          setOrderId(null);
        }
      });
  };

  useEffect(() => {
    setCurrentPage(0);
    const data = {
      page: 0,
      count: countPage,
      order: "my",
      categories: categories,
      subcategories: subcategories,
      tradetypes: [],
      regions: regions,
      districts: districts,
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
  }, [order, categories, subcategories, tradetypes, regions, districts, name]);

  useEffect(() => {
    const data = {
      order: "my",
      page: currentPage,
      count: countPage,
      categories: categories,
      subcategories: subcategories,
      tradetypes: tradetypes,
      regions: regions,
      districts: districts,
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
    <div className='w-full bg-white'>
      <div className='md:container'>
        <div className='w-full md:px-4 flex flex-col gap-[20px]'>
          <div className='flex flex-col md:flex-row justify-between w-full md:items-end px-2'>
            <div>
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
            </div>
            <div className='flex justify-center mt-3 md:mt-0'>
              {" "}
              <AddButton
                onClick={() => navigate("/create_order")}
                title={"Создать заявку"}
              />
            </div>
          </div>
          <div className='px-4 flex flex-col gap-[20px]'>
            {loading ? (
              <Loading />
            ) : (
              map(orders, (order) => (
                <MyCard
                  translations={translations}
                  logged={logged}
                  key={uniqueId()}
                  order={order}
                  editHandler={() =>
                    navigate("/edit_order", {
                      state: { orderId: order._id },
                    })
                  }
                  deleteHandler={deleteHandler}
                  updatePosition={updatePosition}
                  isProfile={true}
                />
              ))
            )}
          </div>
          {totalDatas > 0 && (
            <div className='flex justify-center py-2'>
              <Pagination
                defaultPage={0}
                variant='outlined'
                color='primary'
                count={Math.ceil(totalDatas / countPage)}
                page={currentPage + 1}
                onChange={(event, value) => {
                  setCurrentPage(value - 1);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <UniversalModal
        isOpen={modalVisible}
        body={modalBody}
        closeModal={closeHandler}
        toggleModal={toggleModal}
        orderId={orderId}
        modalBody={modalBody}
        headerText={"Удалить заказ"}
        title={"Вы действительно хотите удалить заказ?"}
        approveFunction={deleteOrderById}
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

export default MyOrders;
