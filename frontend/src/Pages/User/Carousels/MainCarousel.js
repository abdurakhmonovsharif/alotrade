import React, { useEffect, useState } from "react";
import bgImg from "../../../assets/background/bg_image.png";
import bgImg1 from "../../../assets/background/1.png";
import bgImg2 from "../../../assets/background/2.png";
import bgImg3 from "../../../assets/background/3.png";
import Carousel from "react-multi-carousel";
import Api from "../../../Config/Api";

const MainCarousel = ({ bgImgs }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      {bgImgs && (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {bgImgs &&
            bgImgs
              ?.filter((el) => el.name)
              ?.map((el, index) => (
                <div
                  key={index}
                  className='w-[100%] h-[200px] md:h-[500px] p-2 md:p-5 rounded-lg overflow-hidden'
                >
                  <img
                    src={el.image}
                    alt='bg'
                    className='w-full h-full object-cover rounded-3xl'
                  />
                </div>
              ))}
        </Carousel>
      )}
    </div>
  );
};

export default MainCarousel;
