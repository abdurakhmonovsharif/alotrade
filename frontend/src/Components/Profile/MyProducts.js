import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductsCount,
  getProducts,
  clearProductData,
} from "../../Pages/User/Products/productSlice";
import { map, uniqueId } from "lodash";
import ProductCard from "../ProductCard/ProductCard";

import UniversalModal from "../Modal/UniversalModal";
import AddButton from "../Buttons/AddButton";
import { universalToast } from "../ToastMessages/ToastMessages";
import { useNavigate } from "react-router-dom";
import Filter from "../../Pages/Filter/Filter";
import { filter } from "../../Pages/User/Products/constants";
import PageHeader from "../PageHeaders/PageHeader";
import { Pagination } from "@mui/material";
import { Loading } from "@nextui-org/react";

const MyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);
  const { products, loading } = useSelector((state) => state.products);
  const {
    product,
    categories,
    subcategories,
    tradetypes,
    regions,
    districts,
    name,
  } = useSelector((state) => state.filter);
  const [productId, setProductId] = useState(null);
  const [totalDatas, setTotalDatas] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const countPage = 10;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const [modalBody, setModalBody] = useState(null);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterBody, setFilterBody] = useState(null);

  const closeHandler = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const deleteHandler = (id) => {
    setProductId(id);
    setModalBody("approve");
    setModalVisible(true);
  };

  const deleteProductById = () => {
    if (productId) {
      dispatch(deleteProduct({ id: productId })).then(({ error }) => {
        if (!error) {
          setModalVisible(false);
          setProductId(null);
          universalToast("Товар успешно удален", "success");
        }
      });
    }
  };

  useEffect(() => {
    const data = {
      product: "my",
      page: 0,
      count: countPage,
      categories: categories,
      subcategories: subcategories,
      tradetypes: tradetypes,
      regions: regions,
      districts: districts,
      user: user?._id,
      name,
    };
    setCurrentPage(0);
    dispatch(getProducts(data));
    dispatch(getProductsCount(data)).then(
      ({ error, payload: { totalCount } }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );
  }, [
    dispatch,
    product,
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
      product: "my",
      categories: categories,
      subcategories: subcategories,
      tradetypes: tradetypes,
      regions: regions,
      districts: districts,
      user: user?._id,
      name,
    };

    dispatch(getProducts(data));
    dispatch(getProductsCount(data)).then(
      ({ payload: { totalCount }, error }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, product, currentPage, countPage]);

  useEffect(() => {
    dispatch(clearProductData());
  }, [dispatch]);

  return (
    <div className='w-full bg-white'>
      <div className='p-2 md:container'>
        <div className='w-full md:px-4 flex flex-col gap-[20px]'>
          <div className='flex flex-col md:flex-row justify-between w-full md:items-end'>
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
            <div className='flex justify-center md:justify-start mt-3 md:mt-0'>
              <AddButton
                onClick={() =>
                  organization?.is_active
                    ? navigate("/edit_product")
                    : setModalVisibleOrg(true)
                }
                title={"Создать товар"}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3'>
            {loading ? (
              <Loading className='col-span-2 md:col-span-4' />
            ) : (
              map(products, (product) => (
                <ProductCard
                  logged={logged}
                  key={uniqueId()}
                  product={product}
                  editHandler={() =>
                    navigate("/create_product", {
                      state: { productId: product._id },
                    })
                  }
                  deleteHandler={deleteHandler}
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
        productId={productId}
        modalBody={modalBody}
        headerText='Удалить товар'
        title='Вы действительно хотите удалить товар?'
        approveFunction={deleteProductById}
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

export default MyProducts;
