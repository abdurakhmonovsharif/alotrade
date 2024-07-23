import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationById } from "./organizationSlice";
import noImage from "../../../assets/images/no-image.svg";
import {
  IoCallSharp,
  IoGlobeOutline,
  IoLocationOutline,
  IoLogoWebComponent,
} from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { map, uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../../translation";
import background1 from "../../../assets/background/1.png";
import background2 from "../../../assets/background/2.png";
import background3 from "../../../assets/background/3.png";
import background4 from "../../../assets/background/4.png";
import UniversalModal from "../../../Components/Modal/UniversalModal";
import { Pagination } from "@mui/material";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { getProducts, getProductsCount } from "../Products/productSlice";
import { BsEnvelope, BsInstagram, BsTelegram } from "react-icons/bs";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import { getAnns, getAnnsCount } from "../Announcements/announcementSlice";
import { getInstagramLink, getTelegramLink } from "../../../Config/links";

const Organization = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const { savdo_turi } = getTranslations(t);

  const {
    logged,
    userData: { user },
  } = useSelector((state) => state.login);

  const { products } = useSelector((state) => state.products);
  const { anns } = useSelector((state) => state.anns);

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

  const [totalAnnsDatas, setTotalAnnsDatas] = useState(0);
  const [currentAnnsPage, setCurrentAnnsPage] = useState(0);
  const countPage = 10;

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
  const [organization, setOrganization] = useState(null);

  const [content, setContent] = useState("descr");

  const backgrounds = [background1, background2, background3, background4];
  const background = backgrounds[Math.floor(Math.random() * 4)];

  const location = useLocation();
  const { _id } = location.state;

  useEffect(() => {
    dispatch(getOrganizationById({ id: _id })).then(
      ({ error, payload: { organization } }) => {
        if (!error) {
          setOrganization(organization);
        }
      }
    );
  }, [_id, dispatch]);

  useEffect(() => {
    const data = {
      page: currentPage,
      count: countPage,
      product,
      categories,
      subcategories,
      tradetypes,
      regions,
      districts,
      user: user?._id,
      name,
      organization: _id,
    };

    const dataAnn = {
      page: currentAnnsPage,
      count: countPage,
      post: "all",
      categories: [],
      subcategories: [],
      tradetypes: [],
      regions: [],
      districts: [],
      user: user?._id,
      name,
      organization: _id,
    };

    dispatch(getProducts(data));
    dispatch(getProductsCount(data)).then(
      ({ payload: { totalCount }, error }) => {
        if (!error) {
          setTotalDatas(totalCount);
        }
      }
    );

    dispatch(getAnns(dataAnn));
    dispatch(getAnnsCount(dataAnn)).then(
      ({ payload: { totalCount }, error }) => {
        if (!error) {
          setTotalAnnsDatas(totalCount);
        }
      }
    );
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, product, currentPage, countPage]);

  return (
    <div className='bg-white w-full h-full'>
      <div className='bg-alotrade/10 md:m-4 rounded-xl shadow-md'>
        <div className='container'>
          <div className='w-full flex items-center gap-4 md:gap-6 flex-col md:flex-row md:justify-between py-6'>
            <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-fit'>
              <div className='rounded-full bg-white-900 p-1'>
                <img
                  className='w-[200px] h-[200px] rounded-full'
                  src={organization?.image || noImage}
                  alt=''
                />
              </div>
              <div className='flex flex-col text-black font-bold w-full md:w-fit items-start px-8 md:px-2'>
                <div className='w-full'>
                  <span className='flex flex-row justify-center font-amazonbold text-[2rem] text-center w-full'>
                    {organization?.name}
                  </span>
                  <h3 className='flex'>
                    <span className='font-normal'>Тип торговли:</span>
                    <p className='pl-2'>
                      {map(organization?.tradetypes, (type) => (
                        <span key={uniqueId()} className='font-amazonbold'>
                          {type?.name},
                        </span>
                      ))}
                    </p>
                  </h3>
                  <h3 className='flex'>
                    <span className='font-normal'>Регион:</span>
                    <p className='pl-2'>{organization?.region?.label}</p>
                  </h3>

                  <h3 className='flex'>
                    <span className='font-normal'>Город:</span>
                    <p className='pl-2'>{organization?.district?.label}</p>
                  </h3>

                  <h4 className='flex items-center my-2'>
                    <IoGlobeOutline size={19} className='text-green-600' />
                    <a
                      target='_blank'
                      href={
                        (organization?.media?.site.startsWith("https://")
                          ? organization?.media?.site
                          : `https://${organization?.media?.site}`) || " - "
                      }
                      className='ml-2 font-normal text-green-800'
                    >
                      {organization?.media?.site !== ""
                        ? organization?.media?.site
                        : " - "}
                    </a>
                  </h4>
                  {/* {organization?.email && (
                  <h4 className="flex items-center my-2">
                    <MdOutlineAlternateEmail size={19} />
                    <a
                      href={`mailto:${organization?.email}`}
                      className="text-black font-amazonbold ml-2"
                    >
                      {organization?.email}
                    </a>
                  </h4>
                )} */}
                </div>
              </div>
            </div>

            <div className='flex flex-col items-start md:justify-end px-8 md:px-2 w-full md:w-fit'>
              <span className='text-[16px] text-green-500 font-bold'>
                Связаться
              </span>

              <h3 className='flex'>
                <span className='font-normal'>Тел: </span>
                <a
                  href={`tel:${organization?.phone || " - "}`}
                  className='ml-2 font-bold'
                >
                  {organization?.phone || " - "}
                </a>
              </h3>
              <h3 className='flex'>
                <span className='font-normal'>Тел: </span>
                <a
                  href={`tel:${organization?.phone2 || " - "}`}
                  className='ml-2 font-bold'
                >
                  {organization?.phone2 || " - "}
                </a>
              </h3>
              <h3 className='flex'>
                <span className='font-normal'>Тел: </span>
                <a
                  href={`tel:${organization?.phone3 || " - "}`}
                  className='ml-2 font-bold'
                >
                  {organization?.phone3 || " - "}
                </a>
              </h3>
              <h4 className='flex items-center my-2'>
                <BsEnvelope size={19} className='text-green-600' />
                <span className='ml-2 font-bold'>
                  {organization?.email || " - "}
                </span>
              </h4>
              <div className='flex flex-row gap-3 items-center'>
                {organization?.media?.instagram && (
                  <a
                    target='_blank'
                    href={`${getInstagramLink(organization?.media?.instagram)}`}
                    className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-gradient-to-tr from-pink-600 to-orange-300'
                  >
                    <BsInstagram className='w-full text-white' />
                  </a>
                )}
                {organization?.media?.telegram && (
                  <a
                    target='_blank'
                    href={`${getTelegramLink(organization?.media?.telegram)}`}
                    className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-sky-500'
                  >
                    <BsTelegram className='w-full text-white' />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container pt-4'>
        <div class='flex justify-between  md:justify-center mb-[20px]'>
          <button
            className={`block w-full md:w-[200px] uppercase shadow-xl border-2 border-alotrade md:ml-0 rounded-tr-none rounded-br-none rounded-l-xl border-r-0  ${
              (content === "descr" && "bg-alotrade text-white") ||
              " bg-white text-[#00c2cb]"
            } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
            onClick={() => setContent("descr")}
          >
            О компании
          </button>
          <button
            className={`block w-full md:w-[200px] uppercase shadow-xl border-2 border-alotrade md:ml-0  ${
              (content === "products" && "bg-alotrade text-white") ||
              " bg-white text-alotrade"
            } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2`}
            onClick={() => setContent("products")}
          >
            Товары
          </button>
          <button
            className={`block w-full md:w-[200px] uppercase shadow-xl border-2 border-alotrade md:ml-0 rounded-tl-none rounded-bl-none rounded-r-xl border-l-0  ${
              (content === "ads" && "bg-alotrade text-white") ||
              " bg-white text-alotrade"
            } font-bold focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-3 md:px-10 px-2 rounded`}
            onClick={() => setContent("ads")}
          >
            Рекламы
          </button>
        </div>
        {content === "descr" ? (
          <div className='py-6'>
            <h2 className='font-bold text-[32px] px-5'>О комании</h2>
            <p className='text-[16px] px-2'>{organization?.description}</p>
          </div>
        ) : content === "products" ? (
          <div className='w-full bg-white'>
            <div className='md:container'>
              <div className='w-full block md:flex'>
                <div className='w-full md:px-4 flex flex-col gap-[20px]'>
                  <h2 className='font-bold text-[32px] px-5'>Товары</h2>
                  {/* <PageHeader
                    isOrganization={!!organization}
                    totalDatas={totalDatas}
                    countPage={countPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    // filter={filter}
                    count={totalDatas}
                    // onClick={() => openModal("createProduct")}
                    // handleFilter={handleFilter}
                    filterData={product}
                    setFilterBody={setFilterBody}
                    setFilterVisible={setFilterVisible}
                    mainTitle={"Товары"}
                    countTitle="Jami:"
                  /> */}
                  <div className='grid grid-cols-2 px-2 gap-2 md:grid-cols-4 md:gap-3'>
                    {map(products, (product) => (
                      <ProductCard
                        logged={logged}
                        key={uniqueId()}
                        product={product}
                        // editHandler={editHandler}
                        // deleteHandler={deleteHandler}
                      />
                    ))}
                  </div>
                  {totalDatas > 0 && (
                    <div className='flex justify-center py-2 mb-8'>
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
            />
          </div>
        ) : (
          <div className='flex flex-col py-5'>
            <h2 className='font-bold text-[32px] px-5'>Рекламы</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 py-2 gap-3'>
              {anns.map((el, index) => (
                <AnnouncementCard isCarousel={true} key={index} ann={el} />
              ))}
            </div>
            {totalAnnsDatas > 0 && (
              <div className='flex justify-center py-2'>
                <Pagination
                  defaultPage={0}
                  variant='outlined'
                  color='primary'
                  count={Math.ceil(totalAnnsDatas / countPage)}
                  page={currentAnnsPage + 1}
                  onChange={(event, value) => {
                    setCurrentAnnsPage(value - 1);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Organization;
