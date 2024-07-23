import React from "react";
import LogoImg from "../../assets/images/loader.png";

const Loader = () => {
  return (
    <div className="z-50 absolute w-full h-full top-0 left-0">
      <div className="flex items-center justify-center w-full h-full ">
        <div className="w-40 h-40 relative flex items-center justify-center">
          <div className="absolute w-40 h-40 border-t-4 border-b-4 border-alotrade rounded-full animate-spin"></div>
          <img src={LogoImg} alt="logo" className=" " />
        </div>
      </div>
    </div>
  );
};

export default Loader;
