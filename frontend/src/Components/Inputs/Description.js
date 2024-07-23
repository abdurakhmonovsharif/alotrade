import React from "react";

const Description = ({
  label,
  labelStyle,
  placeholder,
  value,
  onChange,
  name,
  onKeyUp,
}) => {
  return (
    <>
      {label && (
        <label
          className={`text-neutral-500 font-semibold text-sm ${labelStyle}`}
        >
          {label}
        </label>
      )}
      <textarea
        onKeyUp={onKeyUp}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        id='discription'
        cols='30'
        rows='8'
        className='w-full border border-gray-300 rounded-md p-2 text-neutral-500 text-sm'
      />
    </>
  );
};

export default Description;
