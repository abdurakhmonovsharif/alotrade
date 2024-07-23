import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import UniversalModal from "../Modal/UniversalModal";

const CustomSlider = ({ width, height, images }) => {
  const [index, setIndex] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const nextSlide = () => {
    if (images.length - 1 === index) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const openModal = () => {
    setVisibleModal(true);
  };

  return (
    <>
      <div className={`relative`} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            backgroundImage: `url(${images[index]})`,
            width: width,
            height: height,
          }}
          onClick={openModal}
          className={`mx-auto bg-center bg-contain bg-no-repeat cursor-pointer`}
        ></div>
        <GrNext
          onClick={nextSlide}
          className="absolute top-[50%] translate-y-[-50%] right-0 fill-white text-[36px] md:text-[42px] cursor-pointer"
        />
        <GrPrevious
          onClick={prevSlide}
          className="absolute top-[50%] translate-y-[-50%] left-0 fill-white text-[36px] md:text-[42px] cursor-pointer"
        />
      </div>
      <UniversalModal
        body={"zoomImg"}
        isOpen={visibleModal}
        img={images[index]}
        closeModal={() => setVisibleModal(false)}
      />
    </>
  );
};

export default CustomSlider;
