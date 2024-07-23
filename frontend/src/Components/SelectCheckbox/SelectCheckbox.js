import React, { useState } from "react";
import FilterHeader from "../FilterHeader/FilterHeader";
import { map, uniqueId } from "lodash";
import Checkbox from "../CheckboxList/Checkbox";
import SelectButton from "./SelectButton";
import SelectInput from "../SelectInput/SelectInput";
import { useLocation } from "react-router-dom";

const SelectCheckbox = ({
  datas,
  property,
  headerText,
  changeHeader,
  headerCheckeds,
  changeBody,
  bodyCheckeds,
  isCategory,
  subcategoryCheckeds,
  changeSubcategory,
  categories,
  changeCategory,
  categoryValue,
}) => {
  const location = useLocation();
  const [currentId, setCurrentId] = useState(null);
  const changeHandler = (e) => {
    const id = e.target.name;
    id === currentId ? setCurrentId(null) : setCurrentId(id);
  };

  const [currentIdSub, setCurrentIdSub] = useState(null);
  const changeHandlerSub = (e) => {
    const id = e.target.name;
    id === currentIdSub ? setCurrentIdSub(null) : setCurrentIdSub(id);
  };

  const pageIncludeFalse =
    !location.pathname.includes("/create_product") &&
    !location.pathname.includes("/create_order") &&
    !location.pathname.includes("/sign-up/business") &&
    !location.pathname.includes("/profile/user");
  const pageIncludeTrue =
    location.pathname.includes("/create_product") ||
    location.pathname.includes("/create_order");

  return (
    <div className='mt-3'>
      <div className={isCategory ? "pb-4 px-4" : "px-4"}>
        {!isCategory && (
          <FilterHeader
            className={"font-bold text-[21px] mt-2"}
            label={headerText}
          />
        )}
        {/* {isCategory && pageIncludeFalse && (
          <SelectInput
            options={categories}
            placeholder={"Выбрать категорию..."}
            onSelect={changeCategory}
            value={categoryValue}
          />
        )} */}
      </div>
      <div className='h-full w-full md:max-h-[500px] overflow-y-scroll no-scrollbar'>
        {map(datas, (data, index) => (
          <div key={uniqueId("selectButton")}>
            <SelectButton
              headerCheckeds={headerCheckeds}
              data={data}
              onClick={changeHandler}
              currentId={currentId}
              changeHeader={changeHeader}
              checkBoxClass='font-semibold'
            />
            <div
              className={`pl-3 transition-all ease-in-out duration-300 ${
                data._id !== currentId && "hidden"
              }`}
            >
              {map(data[property], (property) => (
                <div key={uniqueId("selectButton")}>
                  <SelectButton
                    headerCheckeds={bodyCheckeds}
                    data={property}
                    onClick={changeHandlerSub}
                    currentId={currentId}
                    changeHeader={changeBody}
                    checkBoxClass='font-semibold'
                  />
                  <div
                    className={`pl-3 transition-all ease-in-out duration-300 ${
                      property._id !== currentIdSub && "hidden"
                    }`}
                  >
                    {map(property["subcategories"], (property) => (
                      <Checkbox
                        onChange={changeSubcategory}
                        checked={subcategoryCheckeds?.some(
                          (checked) =>
                            checked._id === property._id ||
                            checked === property._id
                        )}
                        data={property}
                        key={uniqueId("selectCheckbox")}
                        className='mt-2'
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* {map(data[property], (property) => (
                <Checkbox
                  onChange={changeBody}
                  checked={bodyCheckeds?.some(
                    (checked) =>
                      checked._id === property._id || checked === property._id
                  )}
                  data={property}
                  key={uniqueId("selectCheckbox")}
                  className='mt-2'
                />
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCheckbox;
