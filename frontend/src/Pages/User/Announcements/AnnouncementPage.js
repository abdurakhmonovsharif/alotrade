import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmblaCarousel from '../../../Components/EmblaCarousel/EmblaCarousel';
import useWindowSize from '../../../hooks/useWindowSize';
import DetailProductCard from '../DetailProduct/Components/DetailProductCard';
import AnnouncementCard from './AnnouncementCard';
import { getAnnById, getAnns } from './announcementSlice';

const AnnouncementPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { anns, ann } = useSelector((state) => state.anns);

  const { width } = useWindowSize();

  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);

  const [imagesForSlide, setImageForSlide] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (ann?._id) {
      setImageForSlide([...ann?.images]);
    }
  }, [ann, id]);

  useEffect(() => {
    return () => {
      setImageForSlide([]);
    };
  }, []);

  useEffect(() => {
    dispatch(getAnnById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    const data = {
      page: 0,
      count: 20,
      post: 'all',
      categories: [],
      subcategories: [],
      tradetypes: [],
      regions: [],
      districts: [],
      user: user?._id,
      name: '',
      //   organization: ann?.organization?._id,
    };
    dispatch(getAnns(data));
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ann]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1.3,
      slidesToSlide: 1.3,
      // partialVisibilityGutter: 120, // optional, default to 1.
    },
  };

  return (
    <div className='w-full bg-white'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 pt-6'>
          <div className='flex justify-center md:block md:col-span-2 p-0'>
            {imagesForSlide.length > 0 && (
              <EmblaCarousel
                slides={imagesForSlide}
                options={{}}
              />
            )}
          </div>

          <div className='flex flex-col gap-5 py-8'>
            <div className='flex gap-[4px]'>
              <h2 className='text-[24px] md:text-[28px] font-bold text-ellipsis line-clamp-2'>
                {ann?.name}
              </h2>
            </div>
            {/* <div className='flex flex-row items-center gap-5 text-[18px] font-medium'>
              <span>Цена:</span>
              <h2 className='text-[30px] text-orange-500 font-bold'>
                {(ann?.maxPrice || "").toLocaleString("ru-RU")} {ann?.currency}
              </h2>
            </div> */}
            <div className='flex items-center gap-[4px] text-[14px] font-medium'>
              <span>Регион:</span>
              <h2 className='text-[16px] font-bold'>{ann?.region?.name}</h2>
            </div>
            {/* <div className='block md:hidden text-[12px] text-center mt-6 bg-teal-200 p-4 rounded-xl'>
              <div className='flex justify-center'>
                <MdOutlineErrorOutline size={30} />
              </div>
              Для уточнения условии доставки и о наличии товара обратитесь к
              поставщику!
            </div> */}
            <div className='col-span-1 mt-5'>
              <DetailProductCard
                id={id}
                user={ann?.user?.organization}
              />
            </div>
            {/* <div className='hidden md:block mt-6 text-center bg-teal-200 p-4 rounded-xl'>
              <div className='flex justify-center'>
                <MdOutlineErrorOutline size={30} />
              </div>
              Для уточнения условии доставки и о наличии товара обратитесь к
              поставщику!
            </div> */}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2 py-[30px]'>
          <div className='col-span-2 bg-white px-2 md:px-6 md:py-2 min-h-[100px] mb-4 md:mb-0'>
            <h2 className='text-[18px] md:text-[32px] font-bold'>Описание</h2>
            <p className='text-[19px] md:text-[21px] whitespace-pre-wrap'>{ann?.description}</p>
          </div>
        </div>
      </div>
      <div className='pt-6 pb-[60px] bg-white md:px-10'>
        <h2 className='text-[21px] md:text-[32px] font-bold mb-4 ml-10'>Другие объявления</h2>
        <Carousel
          responsive={responsive}
          sliderClass='flex justify-center gap-2 md:gap-4 '
          autoPlay={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          infinite={true}
          itemClass=''
        >
          {map(anns, (ann) => (
            <AnnouncementCard
              key={ann?._id}
              ann={ann}
              isCarousel={true}
            />
            // <ProductCard
            //   logged={logged}
            //   key={uniqueId()}
            //   product={product}
            //   isProductPage={true}
            // />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AnnouncementPage;
