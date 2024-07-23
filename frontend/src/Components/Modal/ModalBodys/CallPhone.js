import React from "react";

const CallPhone = ({ phone }) => {
  return (
    <div className="flex flex-col bg-white rounded p-4">
      <h2 className="text-[16px] text-center">Контакты</h2>
      <a
        href={`tel:${phone}`}
        className="w-full
        mt-4
            flex
            justify-center
            items-center
            text-sm
            font-medium
            rounded
            mb-4
            outline-none
            border border-transparent
            focus-visible:shadow-none
            focus:border-white
            text-alotrade
            "
      >
        {phone}
      </a>
    </div>
  );
};

export default CallPhone;
