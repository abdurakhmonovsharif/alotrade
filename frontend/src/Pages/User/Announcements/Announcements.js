import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import Filter from "../../Filter/Filter";
import PageHeader from "../../../Components/PageHeaders/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { filter } from "../Products/constants";
import { Pagination } from "@mui/material";
import { clearAnnsData, getAnns, getAnnsCount } from "./announcementSlice";
import { filterAnns, filterCategories } from "../../Filter/filterSlice";
import { Loading } from "@nextui-org/react";

const Announcements = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  const { width } = useWindowSize();

  const { anns, loading } = useSelector((state) => state.anns);
  const {
    product,
    categories,
    subcategories,
    subcategories2,
    tradetypes,
    regions,
    districts,
    name,
  } = useSelector((state) => state.filter);
  const [productId, setProductId] = useState(null);
  const [totalDatas, setTotalDatas] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(width < 720 ? 20 : 15);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState(null);

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
    setProductId(null);
  };

  const deleteHandler = (id) => {
    setProductId(id);
    setModalBody("approve");
    setModalVisible(true);
  };

  const editHandler = (id) => {
    setProductId(id);
    setModalBody("createProduct");
    setModalVisible(true);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    dispatch(filterAnns(value));
  };

  useEffect(() => {
    const locData = location?.state?.category?.value;
    const data = {
      page: currentPage,
      count: countPage,
      post: "all",
      categories: categories,
      subcategories,
      subcategories2,
      tradetypes: [],
      regions,
      districts,
      user: user?._id,
      name,
    };

    if (locData) {
      data.categories = [...categories, locData];
    }

    dispatch(getAnns(data));
    dispatch(getAnnsCount(data)).then(({ payload: { totalCount }, error }) => {
      if (!error) {
        setTotalDatas(totalCount);
      }
    });
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    product,
    currentPage,
    countPage,
    categories,
    subcategories,
    subcategories2,
    tradetypes,
    regions,
    districts,
    user,
    name,
    width,
  ]);

  useEffect(() => {
    setCountPage(width < 720 ? 20 : 15);
  }, [width]);

  useEffect(() => {
    dispatch(clearAnnsData());
  }, [dispatch]);

  return (
    <div className='w-full bg-white pb-[100px] px-[2px] md:px-0'>
      <div className='md:container'>
        <div className='w-full block md:flex'>
          <Filter
            filterBody={filterBody}
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
          />
          <div className='w-full md:px-4 flex flex-col gap-[20px] items-center'>
            <PageHeader
              isOrganization={!!organization}
              totalDatas={totalDatas}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filter={filter}
              count={totalDatas}
              onClick={() => openModal("createProduct")}
              handleFilter={handleFilter}
              filterData={product}
              setFilterBody={setFilterBody}
              setFilterVisible={setFilterVisible}
              mainTitle={"Товары"}
              countTitle='Jami:'
              filterBtnClick={() => setFilterVisible(!filterVisible)}
            />
            {loading ? (
              <Loading />
            ) : (
              <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:my-5'>
                {anns && anns.map((el, index) => <AnnouncementCard ann={el} />)}
              </div>
            )}
            <Pagination
              defaultPage={1}
              variant='outlined'
              color='primary'
              count={Math.ceil(totalDatas / countPage)}
              page={currentPage + 1}
              onChange={(event, value) => {
                setCurrentPage(value - 1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
