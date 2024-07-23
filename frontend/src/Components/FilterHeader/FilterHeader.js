import React from "react";

const FilterHeader = ({ label, className }) => {
  return (
    <h3 className={`tracking-normal text-neutral-700 ${className}`}>{label}</h3>
  );
};

export default FilterHeader;
