import React from "react";
import { map, uniqueId } from "lodash";
import Checkbox from "./Checkbox";
import FilterHeader from "../FilterHeader/FilterHeader";

const CheckboxList = ({
  list,
  headerText,
  cols = 1,
  onChange,
  checkedList,
  headerStyle,
  listStyle,
}) => {
  return (
    <div className=''>
      <FilterHeader label={headerText} className={headerStyle} />
      <div className={`grid grid-cols-1 md:grid-cols-${cols} ${listStyle}`}>
        {map(list, (data) => (
          <Checkbox
            onChange={onChange}
            data={data}
            key={uniqueId("checkbox")}
            checked={checkedList?.some((item) => item._id === data._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxList;
