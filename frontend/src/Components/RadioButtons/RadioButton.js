import React from "react";

const RadioButton = ({ label, value, onChange, name, currency }) => {
  return (
    <label className="text-sm text-neutral-500 flex items-center ">
      <input
        checked={currency === value}
        name={name}
        type="radio"
        className="mr-2"
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
