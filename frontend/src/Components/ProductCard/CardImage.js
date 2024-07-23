import React from "react";

const CardImage = () => {
  return (
    <div className="col-span-3 grid grid-cols-3">
      <div className="col-span-2 p-2">
        <img
          src="https://picsum.photos/400"
          className="rounded"
          width={230}
          alt="alotrade.uz"
        />
      </div>
      <div className="grid grid-rows-2">
        <div className="p-2">
          <img
            src="https://picsum.photos/400"
            className="rounded"
            width={90}
            alt="alotrade.uz"
          />
        </div>
        <div className="p-2">
          <img
            src="https://picsum.photos/400"
            className="rounded"
            width={90}
            alt="alotrade.uz"
          />
        </div>
      </div>
    </div>
  );
};

export default CardImage;
