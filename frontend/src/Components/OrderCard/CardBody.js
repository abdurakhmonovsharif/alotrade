import React from "react";
import TextTruncate from "react-text-truncate";

const CardBody = ({ title, description }) => {
  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }
  return (
    <div class="px-4">
      <h4 class="text-[14px] md:text-[18px] font-semibold text-cyan-900">
        {title}
      </h4>
      <p className="text-[12px] md:text-[16px] text-justify">
        <TextTruncate line={3} text={description} />
      </p>
    </div>
  );
};

export default CardBody;
