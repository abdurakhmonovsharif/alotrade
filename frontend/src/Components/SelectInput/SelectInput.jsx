import React from "react";
// import Select from "react-select";
import CustomStyle, { DropdownIcon } from "./CustomStyle";
import { MenuItem, Select } from "@mui/material";

const SelectInput = ({
  onSelect,
  options,
  isDisabled,
  label,
  placeholder,
  value,
  name,
  isMulti = false,
  closeMenuOnSelect = true,
}) => {
  const { value: selectedVal } = value;

  return (
    <div className='grow'>
      {label && (
        <label
          className={"text-blue-700 block leading-[1.125rem] mb-[.625rem]"}
        >
          {label}
        </label>
      )}
      <Select
        size='small'
        className='w-full'
        name={name}
        onChange={(event) => {
          if (isMulti) {
            //
            const selectedOptions = event.target.value?.map((el) => {
              const selectedOption = options.find(
                (option) => option._id === el
              );
              //
              return {
                label: selectedOption.name,
                value: selectedOption._id,
                ...selectedOption,
              };
            });
            onSelect(selectedOptions);
          } else {
            const selectedOption = options.find(
              (option) => option._id === event.target.value
            );
            onSelect({
              label: selectedOption.name,
              value: selectedOption._id,
              ...selectedOption,
            });
          }
        }}
        value={
          isMulti
            ? [...value.map((el) => el?.value)]
            : selectedVal
            ? selectedVal
            : ""
        }
        // options={options?.map((el) => ({
        //   label: el.name,
        //   value: el._id,
        //   ...el,
        // }))}
        defaultValue={
          isMulti
            ? [...value.map((el) => el?.value)]
            : selectedVal
            ? selectedVal
            : ""
        }
        disabled={isDisabled}
        placeholder={placeholder}
        // components={{
        //   IndicatorSeparator: () => null,
        //   DropdownIndicator: DropdownIcon,
        // }}
        displayEmpty
        multiple={isMulti}
        renderValue={
          isMulti
            ? [...value.map((el) => el?.value)].length == 0
              ? () => (
                  <span className='text-[14px] text-neutral-400'>
                    {placeholder}
                  </span>
                )
              : undefined
            : selectedVal == "" || !selectedVal
            ? () => (
                <span className='text-[14px] text-neutral-400'>
                  {placeholder}
                </span>
              )
            : undefined
        }
        // closeMenuOnSelect={closeMenuOnSelect}
      >
        {options?.map((option) => {
          //

          //

          return (
            <MenuItem
              sx={{
                "&$selected": {
                  // this is to refer to the prop provided by M-UI
                  backgroundColor: "black", // updated backgroundColor
                },
              }}
              color='success'
              key={option._id ? option?._id : option?.value}
              value={option._id ? option?._id : option?.value}
            >
              {option.name ? option?.name : option?.label}
            </MenuItem>
          );
        })}
      </Select>
      {/* <Select
        name={name}
        onChange={onSelect}
        styles={CustomStyle}
        value={value}
        options={options?.map((el) => ({
          label: el.name,
          value: el._id,
          ...el,
        }))}
        isDisabled={isDisabled}
        placeholder={placeholder}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: DropdownIcon,
        }}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
      /> */}
    </div>
  );
};

export default SelectInput;
