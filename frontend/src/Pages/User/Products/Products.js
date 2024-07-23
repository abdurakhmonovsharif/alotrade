import React, { useEffect, useState } from "react";
import PageHeader from "../../../Components/PageHeaders/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "./constants";
import { filterProduct } from "../../Filter/filterSlice";
import {
  deleteProduct,
  getProductsCount,
  getProducts,
  clearProductData,
} from "./productSlice";
import UniversalModal from "../../../Components/Modal/UniversalModal";
import { map, uniqueId } from "lodash";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import Filter from "../../Filter/Filter";

import { useLocation } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { Pagination } from "@mui/material";
import { Loading } from "@nextui-org/react";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  const { width } = useWindowSize();

  const { products, loading } = useSelector((state) => state.products);
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
    dispatch(filterProduct(value));
  };

  const deleteProductById = () => {
    productId &&
      dispatch(deleteProduct({ id: productId })).then(({ error }) => {
        if (!error) {
          setModalVisible(false);
          setProductId(null);
        }
      });
  };

  useEffect(() => {
    window.history.replaceState({}, document.title);

    const locData = location?.state?.category?._id;

    const data = {
      page: currentPage,
      count: countPage,
      product,
      categories: categories,
      subcategories,
      subcategories2,
      tradetypes,
      regions,
      districts,
      user: user?._id,
      name,
    };

    if (locData) {
      data.categories = [...categories, locData];
    }

    dispatch(getProducts(data));
    dispatch(getProductsCount(data)).then(
      ({ payload: { totalCount }, error }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );
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
    dispatch(clearProductData());
  }, [dispatch]);

  return (
    <div className='w-full bg-white pb-[100px]'>
      <div className='md:container'>
        <div className='w-full block md:flex'>
          <Filter
            filterBody={filterBody}
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
          />
          <div className='w-full md:px-4 flex flex-col gap-[20px]'>
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
              <div className='grid grid-cols-2 px-2 gap-2 md:grid-cols-5 md:gap-3'>
                {map(products, (product) => (
                  <ProductCard
                    logged={logged}
                    key={uniqueId()}
                    product={product}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </div>
            )}
            {/* {width > 720 ? ( */}
            {totalDatas > 0 && (
              <div className='flex justify-center py-2'>
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
            )}
            {/* ) : (
              <div className='w-full flex justify-center'>
                <button
                  onClick={() => setCountPage((prev) => prev + 20)}
                  className='bg-alotrade shadow-xl text-white rounded py-2 px-4 text-[14px]'
                >
                  Показать еще
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>

      <UniversalModal
        isOpen={modalVisible}
        body={modalBody}
        closeModal={closeHandler}
        toggleModal={toggleModal}
        productId={productId}
        modalBody={modalBody}
        headerText="Mahsulotni o'chirish"
        title="Siz rostdan ham mahsulotni o'chirmoqchimisiz?"
        approveFunction={deleteProductById}
      />
    </div>
  );
};

export default Products;
