import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Input = ({
  placeholder,
  type = "text",
  label,
  value,
  margin,
  onChange,
  onKeyUp,
  name,
  required = false,
  isDisabled,
  labelStyle,
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");
  const [inputType, setInputType] = useState(type);
  const changeShowPassword = (e) => {
    e.preventDefault();
    setInputType(showPassword ? "text" : "password");
    setShowPassword(!showPassword);
  };

  return (
    <div className={`py-2 w-full flex flex-col text-neutral-700 ${margin}`}>
      {label && (
        <label
          className={`text-neutral-500 font-semibold text-sm ${labelStyle}`}
        >
          {label}
        </label>
      )}
      <div className="w-full relative text-neutral-700">
        <input
          disabled={isDisabled}
          required={required}
          name={name}
          onKeyUp={onKeyUp}
          onChange={onChange}
          value={value}
          type={inputType}
          placeholder={placeholder}
          className="w-full text-neutral-600 text-sm  bg-white-900 outline-0 py-[.425rem] px-3 rounded border my-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {type === "password" && (
          <span onClick={changeShowPassword} className="absolute right-3 top-2">
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
