import React from "react";
import SelectInput from "../SelectInput/SelectInput";

const SelectRegion = ({
  regions,
  region,
  loading,
  selectRegion,
  district,
  districts,
  selectDistrict,
  isMultiRegion = false,
  isMultiDistrict = false,
  labelRegion,
  labelDistrict,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
      <div className="md:mr-3 w-full">
        {labelRegion && (
          <p className="text-neutral-500 text-sm mt-[7px]">{labelRegion}</p>
        )}
        <SelectInput
          placeholder={labelRegion}
          options={regions}
          onSelect={selectRegion}
          value={region}
          name="region"
          isDisabled={loading}
          isMulti={isMultiRegion}
        />
      </div>
      <div className="w-full">
        {labelDistrict && (
          <p className="text-neutral-500 text-sm mt-[7px]">{labelDistrict}</p>
        )}
        <SelectInput
          placeholder={labelDistrict}
          value={district}
          options={districts}
          onSelect={selectDistrict}
          name={"district"}
          isDisabled={loading || !region.label}
          isMulti={isMultiDistrict}
        />
      </div>
    </div>
  );
};

export default SelectRegion;
