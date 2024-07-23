import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UniversalModal from '../../../Components/Modal/UniversalModal';
import useWindowSize from '../../../hooks/useWindowSize';
import { filterAnns } from '../../Filter/filterSlice';
import AnnouncementCard from './AnnouncementCard';
import { clearAnnsData, getAnns, getAnnsCount } from './announcementSlice';

const MainAnnouncements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  const { width } = useWindowSize();

  const [mainAnns, setMainAnns] = useState([]);

  const { anns } = useSelector((state) => state.anns);
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
  const [countPage, setCountPage] = useState(width < 720 ? 10 : 15);

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

  const openModal = (body) => {
    setModalBody(body);
    setModalVisible(true);
    setProductId(null);
  };

  const deleteHandler = (id) => {
    setProductId(id);
    setModalBody('approve');
    setModalVisible(true);
  };

  const editHandler = (id) => {
    setProductId(id);
    setModalBody('createProduct');
    setModalVisible(true);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    dispatch(filterAnns(value));
  };

  useEffect(() => {
    const locData = location?.state?.category?.value;
    const data = {
      page: 0,
      count: countPage + currentPage * (width < 720 ? 10 : 15),
      post: 'all',
      categories: [],
      subcategories: [],
      subcategories2: [],
      tradetypes: [],
      regions: [],
      districts: [],
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

    // const tempArr = [...mainAnns];
    // tempArr[currentPage] = anns;
    // setMainAnns(tempArr);

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

  // useEffect(() => {
  //
  //   const tempArr = [...mainAnns];
  //   tempArr[currentPage] = anns;
  //   setMainAnns(tempArr);
  // }, [anns]);

  useEffect(() => {
    setCountPage(width < 720 ? 10 : 15);
  }, [width]);

  useEffect(() => {
    dispatch(clearAnnsData());
  }, [dispatch]);

  return (
    <div className='flex flex-col w-full py-5 md:py-5'>
      <div className='grid grid-cols-2 sm:grid-cols-3 items-center w-full px-3 sm:px-0'>
        <button
          onClick={() => {
            logged
              ? organization?.is_active
                ? navigate('/create_announcement')
                : setModalVisibleOrg(true)
              : openModal();
          }}
          className='hidden sm:flex uppercase shadow md:ml-0 w-fit h-fit bg-alotrade hover:bg-alotrade/80 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          {'Создать Рекламу'}
        </button>
        <h2 className='md:text-[36px] text-[16px] font-bold justify-self-start sm:justify-self-center'>
          {'РЕКЛАМЫ'}
        </h2>
        <Link
          to='/announcements'
          className='block uppercase shadow md:ml-0 justify-self-end w-fit h-fit  bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white md:text-xs text-[10px] py-2 md:px-10 px-4 rounded'
        >
          {'Все рекламы'}
        </Link>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 items-center justify-center md:gap-2 my-5 px-[-60px] md:px-0'>
        {anns &&
          anns?.map((ann, ind) => (
            <AnnouncementCard
              key={ann?._id}
              ann={ann}
            />
          ))}
      </div>
      <div className='flex justify-center items-center w-full py-2'>
        {Math.ceil(totalDatas / countPage) != currentPage + 1 && (
          <Button
            color='alotrade'
            variant='contained'
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Показать еще
          </Button>
        )}
      </div>

      <UniversalModal
        body={'warningSignIn'}
        isOpen={modalVisible}
        typeOfWarning={'user'}
        closeModal={() => setModalVisible(false)}
      />

      <UniversalModal
        body={'warningOrg'}
        isOpen={modalVisibleOrg}
        closeModal={() => setModalVisibleOrg(false)}
        toggleModal={() => setModalVisibleOrg(false)}
      />
    </div>
  );
};

export default MainAnnouncements;
