import React from "react";
import Input from "../Inputs/Input";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../translation";

const MinMaxPrice = ({ minPrice, maxPrice, onChange, onKeyUp }) => {
  const { t } = useTranslation(["common"]);
  const { narxi } = getTranslations(t);
  return (
    <div>
      <div className="">
        <Input
          name="maxPrice"
          type="number"
          onKeyUp={onKeyUp}
          placeholder={narxi}
          label={narxi}
          labelStyle={``}
          value={maxPrice}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default MinMaxPrice;
