import React from "react";
import { uniqueId, map } from "lodash";
import RadioButton from "./RadioButton";
import InputHeaderText from "../InputHeaderText/InputHeaderText";

const RadioButtonList = ({ list, label, onChange, name, currency }) => {
  return (
    <div>
      {label && <InputHeaderText title={label} />}
      {map(list, (item) => (
        <RadioButton
          currency={currency}
          name={name}
          key={uniqueId()}
          label={item.label}
          value={item.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonList;
