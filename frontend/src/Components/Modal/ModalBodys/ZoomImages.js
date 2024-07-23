import React from "react";

const ZoomImages = ({ imgUrl }) => {
  return (
    <div className="w-full">
      <img src={imgUrl} alt="img" className="w-full" />
    </div>
  );
};

export default ZoomImages;
