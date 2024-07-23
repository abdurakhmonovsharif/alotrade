import { map, uniqueId } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useWindowSize from "../../../hooks/useWindowSize";
import { getProducts } from "../Products/productSlice";
import UniversalModal from "../../../Components/Modal/UniversalModal";
import { useState } from "react";
import MainProductCard from "../../../Components/ProductCard/MainProductCard";

const MainProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const {
    logged,
    userData: { user },
  } = useSelector((state) => state.login);
  const { products } = useSelector((state) => state.products);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    let count = 20;
    if (width < 720) {
      count = 10;
    }
    const data = {
      page: 0,
      count: count,
      user: user?._id,
    };
    dispatch(getProducts(data));
  }, [dispatch, width, user]);

  return (
    <div className='flex flex-col mt-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 items-center w-full px-3 sm:px-0'>
        <div className='hidden sm:flex'></div>
        {/* <button
          onClick={() => {
            logged ? navigate("/create_announcement") : openModal();
          }}
          className='hidden sm:flex uppercase shadow md:ml-0 w-fit h-fit bg-alotrade hover:bg-alotrade/80 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          {"Создать Рекламу"}
        </button> */}
        <h2 className='md:text-[36px] text-[16px] font-bold justify-self-start sm:justify-self-center'>
          {"ТОВАРЫ"}
        </h2>
        <Link
          to='/products'
          className='block uppercase shadow md:ml-0 justify-self-end w-fit h-fit  bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          {"Все товары"}
        </Link>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 py-4 w-full h-fit items-stretch'>
        {map(products, (product) => (
          <ProductCard logged={logged} key={uniqueId()} product={product} />
        ))}
      </div>
      {/* <div className='flex justify-center py-2'>
        <Link
          to='/products'
          className='block uppercase shadow md:ml-0  bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          Все товары
        </Link>
      </div> */}
      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        typeOfWarning={"user"}
        closeModal={() => setModalVisible(false)}
      />
    </div>
  );
};

export default MainProducts;
